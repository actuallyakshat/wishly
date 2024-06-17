import prisma from "@/db";
import moment from "moment-timezone";

export const fetchEventsForCurrentWeek = async () => {
  const twoDaysAgo = moment().subtract(2, "days").toDate();
  const oneWeekLater = moment().add(9, "days").endOf("day").toDate();

  console.log(twoDaysAgo, oneWeekLater);

  return await prisma.event.findMany({
    where: {
      disableReminder: false,
      date: {
        gte: twoDaysAgo,
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
