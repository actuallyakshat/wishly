import React from "react";
import MonthWiseEventsList from "./_components/MonthWiseEventsList";
import { currentUser } from "@clerk/nextjs/server";
import { getUserId } from "../_actions/actions";
import prisma from "@/db";
import { Category, Event } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryWiseEventsList from "./_components/CategoryWiseEventsList";
import { EventWithCategory } from "@/lib/types";
import SearchLayout from "./_components/SearchLayout";

export default async function page() {
  const user = await currentUser();
  const userId = await getUserId(user!.primaryEmailAddress!.emailAddress);
  let events: EventWithCategory[] | [] = [];
  let categories: Category[] | [] = [];
  let fetchCompleteFlag = false;
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
    categories = await prisma.category.findMany({
      where: {
        userId,
      },
      include: {
        events: true,
      },
    });
  }
  fetchCompleteFlag = true;

  if (!fetchCompleteFlag) {
    return (
      <h1 className="p-12 text-xl font-semibold text-muted-foreground">
        Loading all events...
      </h1>
    );
  }
  return (
    <main className="w-full p-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">All Events</h1>
          <h4 className="text-sm text-muted-foreground">
            List of all the events you have saved on Wishly.
          </h4>
        </div>
        <SearchLayout events={events} />
      </div>

      <Tabs defaultValue="month-wise" className="mt-5 w-full">
        <TabsList className="w-full max-w-lg">
          <TabsTrigger value="month-wise" className="w-full">
            Month Wise
          </TabsTrigger>
          <TabsTrigger value="category-wise" className="w-full">
            Category Wise
          </TabsTrigger>
        </TabsList>
        <TabsContent value="month-wise">
          <MonthWiseEventsList data={events} />
        </TabsContent>
        <TabsContent value="category-wise">
          <CategoryWiseEventsList data={events} categories={categories} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
