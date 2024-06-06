import { Button } from "@/components/ui/button";
import { Event } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Category {
  id: number;
  name: string;
  events: Event[];
}

export default function EventsByCategory({ data }: { data: Category[] }) {
  return (
    <section>
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center lg:gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Events By Category</h1>
          <h4 className="text-sm text-muted-foreground">
            Events organized by category.
          </h4>
        </div>
        <Link href={"/dashboard/manage-categories"}>
          <Button variant={"link"} className="h-fit p-0">
            Manage Categories
          </Button>
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {data?.map((category: Category) => (
          <div
            key={category.id}
            className="w-full rounded-lg border p-4 shadow-sm"
          >
            <h2 className="text-xl font-extrabold">{category.name}</h2>
            <div className="my-1">
              {category.events?.map((event: Event) => (
                <div key={event.id}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{event.name}</h4>
                    <h4 className="text-sm text-muted-foreground">
                      {event.date.toLocaleDateString()}
                    </h4>
                  </div>
                </div>
              ))}
              {category.events?.length === 0 && (
                <div className="flex items-center justify-between">
                  <h2 className="text-sm text-muted-foreground">
                    No events found.
                  </h2>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
