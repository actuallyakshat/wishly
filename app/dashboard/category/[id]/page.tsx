import prisma from "@/db";
import React from "react";
import GobackButton from "../../manage-categories/_components/GobackButton";
import EventCard from "../../_components/EventCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const categoryId = Number(id);
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      events: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });
  return (
    <main className="p-12">
      <GobackButton />
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{category?.name}</h1>
          <h4 className="text-sm text-muted-foreground">
            {category?.events.length == 1
              ? "1 Event"
              : category?.events.length + " Events"}
          </h4>
        </div>
        <Link href="/dashboard/manage-categories">
          <Button variant={"link"} className="h-fit p-0">
            Manage Categories
          </Button>
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {category?.events?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
