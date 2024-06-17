import React from "react";
import UpcomingEvents from "./_components/UpcomingEvents";
import AllEvents from "./_components/AllEvents";
import { currentUser } from "@clerk/nextjs/server";
import { getUserId } from "./_actions/actions";
import prisma from "@/db";
import EventsByCategory from "./_components/EventsByCategory";
import { getAllCategories } from "./add-event/_actions/actions";
import { EventWithCategory } from "@/lib/types";
export default async function Dashboard() {
  const user = await currentUser();
  const userId = await getUserId(user!.primaryEmailAddress!.emailAddress);
  let allEvents: EventWithCategory[] | [] = [];
  if (userId) {
    allEvents = await prisma.event.findMany({
      where: {
        userId: userId!,
      },
      include: {
        category: true,
      },
    });
  }

  const eventsbycategory = await getAllCategories(userId!);

  const eventsThisMonth = allEvents.filter((event) => {
    return event.date.getMonth() === new Date().getMonth();
  });

  return (
    <main className="flex flex-col gap-8 p-12">
      <UpcomingEvents data={eventsThisMonth} />
      <EventsByCategory data={eventsbycategory} />
      <AllEvents allEvents={allEvents} />
    </main>
  );
}
