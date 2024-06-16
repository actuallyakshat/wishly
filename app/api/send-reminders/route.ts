import { fetchEventsForCurrentWeek } from "@/lib/reminder-helpers/functions";
import moment from "moment-timezone";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const eventsWithUsers = await fetchEventsForCurrentWeek();
    eventsWithUsers.forEach((event) => {
      const userTimeZone = event.user.timeZone || "UTC";
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
        console.log("send email for today");
      } else if (reminderType == "tomorrow") {
        console.log("send email for tomorrow");
      } else if (reminderType == "week") {
        console.log("send email for week");
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
