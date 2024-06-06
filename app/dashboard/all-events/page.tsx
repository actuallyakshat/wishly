import React from "react";
import MonthWiseEventsList from "./_components/MonthWiseEventsList";
import { currentUser } from "@clerk/nextjs/server";
import { getUserId } from "../_actions/actions";
import prisma from "@/db";
import { Event } from "@prisma/client";

export default async function page() {
  const user = await currentUser();
  const userId = await getUserId(user!.primaryEmailAddress!.emailAddress);
  let events: Event[] | [] = [];
  if (userId) {
    events = await prisma.event.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "asc",
      },
      include: {
        category: true,
      },
    });
  }

  return (
    <main className="p-12">
      <h1 className="text-2xl font-semibold">All Events</h1>
      <h4 className="text-sm text-muted-foreground">
        List of all the events you have saved on Wishly, arranged by month.
      </h4>
      <hr className="my-2" />
      <MonthWiseEventsList data={events} />
    </main>
  );
}
