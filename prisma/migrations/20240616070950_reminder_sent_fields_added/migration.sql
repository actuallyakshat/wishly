-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "reminderSentDay" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reminderSentOnDay" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reminderSentWeek" BOOLEAN NOT NULL DEFAULT false;
