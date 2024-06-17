import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export const fetchEventsForCurrentWeek = async () => {
  // Calculate the start and end of the current week
  const weekStart = moment().startOf("week");
  const weekEnd = moment().endOf("week");

  // Format the dates to ignore the year
  const startMonthDay = weekStart.format("MM-DD");
  const endMonthDay = weekEnd.format("MM-DD");

  // Fetch events within the current week regardless of the year
  const events = await prisma.event.findMany({
    where: {
      disableReminder: false,
      OR: [
        {
          reminderSentWeekBefore: false,
        },
        {
          reminderSentDayBefore: false,
        },
        {
          reminderSentOnDay: false,
        },
      ],
      AND: [
        {
          OR: [
            {
              reccuring: true,
            },
            {
              date: {
                gte: moment().startOf("year").toDate(),
                lte: moment().endOf("year").toDate(),
              },
            },
          ],
        },
      ],
    },
    include: {
      user: {
        include: {
          emails: true,
          emailPreferences: true,
        },
      },
    },
  });

  // Filter events to include only those occurring within the current week regardless of the year
  const filteredEvents = events.filter((event) => {
    const eventMonthDay = moment(event.date).format("MM-DD");
    return eventMonthDay >= startMonthDay && eventMonthDay <= endMonthDay;
  });

  console.log(filteredEvents);
  return filteredEvents;
};
