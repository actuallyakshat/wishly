import { Event } from "@prisma/client";
import React from "react";

export default function UpcomingEvents({ data }: { data: Event[] | [] }) {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Upcoming This Month</h1>
      <h4 className="text-sm text-muted-foreground">
        Events that are on your calendar this month.
      </h4>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((event) => (
          <div
            key={event.id}
            className="w-full rounded-lg border p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{event.name}</h2>

                <h4 className="text-sm text-muted-foreground">
                  {event.description}
                </h4>
              </div>
              <h4 className="text-sm text-muted-foreground">
                {event.date.toLocaleDateString()}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
