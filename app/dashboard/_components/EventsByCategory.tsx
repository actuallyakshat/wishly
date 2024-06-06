import { Event } from "@prisma/client";
import React from "react";

interface Category {
  id: number;
  name: string;
  events: Event[];
}

export default function EventsByCategory({ data }: { data: Category[] }) {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Events By Category</h1>
      <h4 className="text-sm text-muted-foreground">
        Events organized by category.
      </h4>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
