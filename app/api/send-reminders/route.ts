export const maxDuration = 59;
export const revalidate = 0;
export const dynamic = "force-dynamic";
import prisma from "@/db";
import ReminderEmailTemplate from "@/lib/email-templates/ReminderTemplate";
import { sendEmail } from "@/lib/mail";
import { fetchEventsForCurrentWeek } from "@/lib/reminder-helpers/functions";
import { render } from "@react-email/components";
import moment from "moment-timezone";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const eventsWithUsers = await fetchEventsForCurrentWeek();
    console.log(eventsWithUsers);
    for (const event of eventsWithUsers) {
      const userTimeZone = event.user.timeZone || "UTC";
      const currentYear = moment.tz(userTimeZone).year();
      const eventYear = moment.tz(event.date, userTimeZone).year();
      if (!event.reccuring && eventYear != currentYear) {
        continue;
      }

      if (event.reccuring && eventYear != currentYear) {
        await prisma.event.update({
          where: { id: event.id },
          data: {
            reminderSentOnDay: false,
            reminderSentDayBefore: false,
            reminderSentWeekBefore: false,
            date: moment(event.date).set("year", currentYear).toDate(),
          },
        });
      }

      console.log(event.user.timeZone);
      const now = moment.tz(userTimeZone).startOf("day");
      const tomorrow = moment.tz(userTimeZone).add(1, "day").startOf("day");
      const weekLater = moment.tz(userTimeZone).add(7, "days").startOf("day");

      let reminderType;
      const eventDate = moment
        .tz(event.date, userTimeZone)
        .set("year", currentYear);

      if (eventDate.isSame(now, "day")) {
        reminderType = "today";
      } else if (eventDate.isSame(tomorrow, "day")) {
        reminderType = "tomorrow";
      } else if (eventDate.isSame(weekLater, "day")) {
        reminderType = "week";
      } else if (eventDate.isBefore(now)) {
        reminderType = "past";
      } else {
        reminderType = "futureEvent";
      }
      const emails = event.user.emails
        .filter((email) => email.active)
        .map((email) => email.email);
      //The event is today
      if (reminderType == "today") {
        if (
          !event.user.emailPreferences?.emailOnDate ||
          event.reminderSentOnDay
        )
          continue;

        console.log("send email for today");
        const preview = `Reminder for ${event.name} today`;
        const headerContent = `You Have an Event Today: ${event.name}`;
        const mainContent = [
          `This is a reminder for your event today: ${event.name}`,
          `${event.description && "Description of the event: "}${event.description}`,
          `Visit Wishly to manage this event`,
        ];
        await handleSendEmail(emails, preview, headerContent, mainContent);
        await prisma.event.update({
          where: { id: event.id },
          data: { reminderSentOnDay: true },
        });
      }
      //The event is tomorrow
      else if (reminderType == "tomorrow") {
        if (
          !event.user.emailPreferences?.emailOneDayBefore ||
          event.reminderSentDayBefore
        )
          continue;
        const preview = `Reminder for ${event.name} tomorrow`;
        const headerContent = `You Have an Event Tomorrow: ${event.name}`;
        const mainContent = [
          `This is a reminder for your event tomorrow: ${event.name}`,
          `${event.description && "Description of the event: "}${event.description}`,
          `Visit Wishly to manage this event`,
        ];
        await handleSendEmail(emails, preview, headerContent, mainContent);
        await prisma.event.update({
          where: { id: event.id },
          data: { reminderSentDayBefore: true },
        });
      }
      //The event is next week
      else if (reminderType == "week") {
        if (
          !event.user.emailPreferences?.emailOneWeekBefore ||
          event.reminderSentWeekBefore
        )
          continue;
        console.log("send email for week");
        const preview = `Reminder for ${event.name} next week`;
        const headerContent = `You Have an Event Next Week: ${event.name}`;
        const mainContent = [
          `This is a reminder for your event next week: ${event.name}`,
          `${event.description && "Description of the event: "}${event.description}`,
          `Visit Wishly to manage this event`,
        ];
        await handleSendEmail(emails, preview, headerContent, mainContent);
        await prisma.event.update({
          where: { id: event.id },
          data: { reminderSentWeekBefore: true },
        });
      }
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching events" },
      { status: 500 },
    );
  }
}

async function handleSendEmail(
  emails: string[],
  preview: string,
  headerContent: string,
  mainContent: string[],
) {
  try {
    const template = render(
      ReminderEmailTemplate({ preview, headerContent, mainContent }),
    );
    await sendEmail({
      //@ts-ignore
      to: emails,
      subject: "Wishly Reminder",
      html: template,
    });
  } catch (error) {
    console.error(error);
  }
}
