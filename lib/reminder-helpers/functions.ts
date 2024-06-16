import prisma from "@/db";
import moment from "moment-timezone";

export const fetchEventsForCurrentWeek = async () => {
  const today = moment().startOf("day").toDate();
  const oneWeekLater = moment().add(8, "days").endOf("day").toDate();

  console.log(today, oneWeekLater);

  return await prisma.event.findMany({
    where: {
      disableReminder: false,
      date: {
        gte: today,
        lte: oneWeekLater,
      },
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
};
