/*
  Warnings:

  - You are about to drop the column `reminderSentDay` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `reminderSentWeek` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "reminderSentDay",
DROP COLUMN "reminderSentWeek",
ADD COLUMN     "reminderSentDayBefore" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reminderSentWeekBefore" BOOLEAN NOT NULL DEFAULT false;
