import React from "react";
import UpcomingEvents from "./_components/UpcomingEvents";
import AllEvents from "./_components/AllEvents";
import { currentUser } from "@clerk/nextjs/server";
import { getUserId } from "./_actions/actions";
import prisma from "@/db";
import { Event } from "@prisma/client";
import EventsByCategory from "./_components/EventsByCategory";
import { getAllCategories } from "./add-event/_actions/actions";
export default async function Dashboard() {
  const user = await currentUser();
  const userId = await getUserId(user!.primaryEmailAddress!.emailAddress);
  let allEvents: Event[] | [] = [];
  if (userId) {
    allEvents = await prisma.event.findMany({
      where: {
        userId: userId!,
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
