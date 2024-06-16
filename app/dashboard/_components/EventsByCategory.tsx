import { Button } from "@/components/ui/button";
import { Event, User } from "@prisma/client";
import moment from "moment-timezone";
import Link from "next/link";
import React from "react";

interface Category {
  id: number;
  name: string;
  events: Event[];
  user: User;
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
            className="h-full w-full rounded-lg border p-4 shadow-sm"
          >
            <div className="flex w-full items-center justify-between">
              <h2 className="text-xl font-extrabold">{category.name}</h2>
              <Link
                href={"/dashboard/category/" + category.id}
                key={category.id}
              >
                <Button variant={"link"} className="h-fit p-0">
                  View All
                </Button>
              </Link>
            </div>

            <div className="mb-1 mt-3">
              {category.events?.map((event: Event) => (
                <div key={event.id}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{event.name}</h4>
                    <h4 className="text-sm text-muted-foreground">
                      {moment(event.date)
                        .tz(category.user.timeZone || "UTC")
                        .format("D/M")}
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
        {data?.length === 0 && (
          <h2 className="text-lg font-medium text-muted-foreground">
            You have not created any categories yet.
          </h2>
        )}
      </div>
    </section>
  );
}
