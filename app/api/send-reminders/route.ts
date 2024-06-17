export const revalidate = 0;
import { sendReminderEmail } from "@/lib/email-methods/emailMethods";
import { fetchEventsForCurrentWeek } from "@/lib/reminder-helpers/functions";
import { Email } from "@prisma/client";
import moment from "moment-timezone";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import ReminderEmailTemplate from "@/lib/email-templates/ReminderTemplate";
export async function GET(req: NextRequest) {
  try {
    const eventsWithUsers = await fetchEventsForCurrentWeek();
    eventsWithUsers.forEach((event) => {
      const userTimeZone = event.user.timeZone || "UTC";
      console.log(event.user.timeZone);
      const now = moment.tz(userTimeZone).startOf("day");
      const tomorrow = moment.tz(userTimeZone).add(1, "day").startOf("day");
      const weekLater = moment.tz(userTimeZone).add(7, "days").startOf("day");

      let reminderType;
      const eventDate = moment.tz(event.date, userTimeZone);

      if (eventDate.isSame(now, "day")) {
        reminderType = "today";
      } else if (eventDate.isSame(tomorrow, "day")) {
        reminderType = "tomorrow";
      } else if (eventDate.isSame(weekLater, "day")) {
        reminderType = "week";
      } else if (eventDate.isBefore(now)) {
        return;
      } else {
        reminderType = "futureEvent";
      }

      if (reminderType == "today") {
        if (!event.user.emailPreferences?.emailOnDate) return;
        console.log("send email for today");
        const preview = `Reminder for ${event.name} today`;
        const headerContent = `You Have an Event Today: ${event.name}`;
        const mainContent = [
          `This is a reminder for your event today: ${event.name}`,
          `${event.description && "Description of the event: "}${event.description}`,
          `Visit Wishly to manage this event`,
        ];
        handleSendEmail(event.user.emails, preview, headerContent, mainContent);
      } else if (reminderType == "tomorrow") {
        if (!event.user.emailPreferences?.emailOneDayBefore) return;
        const preview = `Reminder for ${event.name} tomorrow`;
        const headerContent = `You Have an Event Tomorrow: ${event.name}`;
        const mainContent = [
          `This is a reminder for your event tomorrow: ${event.name}`,
          `${event.description && "Description of the event: "}${event.description}`,
          `Visit Wishly to manage this event`,
        ];
        handleSendEmail(event.user.emails, preview, headerContent, mainContent);
      } else if (reminderType == "week") {
        if (!event.user.emailPreferences?.emailOneWeekBefore) return;
        console.log("send email for week");
        const preview = `Reminder for ${event.name} next week`;
        const headerContent = `You Have an Event Next Week: ${event.name}`;
        const mainContent = [
          `This is a reminder for your event next week: ${event.name}`,
          `${event.description && "Description of the event: "}${event.description}`,
          `Visit Wishly to manage this event`,
        ];
        handleSendEmail(event.user.emails, preview, headerContent, mainContent);
      }
    });
    return NextResponse.json(eventsWithUsers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching events" },
      { status: 500 },
    ); // Return error with status 500
  }
}

async function handleSendEmail(
  emails: Email[],
  preview: string,
  headerContent: string,
  mainContent: string[],
) {
  try {
    const activeEmails = emails
      .filter((email) => email.active)
      .map((email) => email.email);

    const reminderTemplate = render(
      ReminderEmailTemplate({ preview, headerContent, mainContent }),
    );

    const payload = {
      from: process.env.MAIL_USER as string,
      to: activeEmails,
      subject: "Wishly Reminder",
      html: reminderTemplate,
    };

    console.log("Payload prepared:", payload);
    console.log("Sending email...");

    await sendEmail(payload);

    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error in handleSendEmail:", error);
    throw error;
  }
}

async function sendEmail(payload: {
  from: string;
  to: string[];
  subject: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    // Verify connection configuration
    await transporter.verify();
    console.log("Server is ready to take our messages");
  } catch (error) {
    console.error("Error verifying transporter:", error);
    throw error; // Re-throw the error to be caught in handleSendEmail
  }

  console.log("Sending email with transporter:", transporter.options);

  try {
    // Send mail
    const info = await transporter.sendMail(payload);
    console.log("Email sent successfully:", info);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw the error to be caught in handleSendEmail
  }
}
