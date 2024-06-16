import prisma from "@/db";
import moment from "moment-timezone";

export const fetchEventsForCurrentWeek = async () => {
  const yesterday = moment().subtract(1, "day").startOf("day").toDate();
  const oneWeekLater = moment().add(8, "days").endOf("day").toDate();

  console.log(yesterday, oneWeekLater);

  return await prisma.event.findMany({
    where: {
      disableReminder: false,
      date: {
        gte: yesterday,
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
      user: true,
    },
  });
};
