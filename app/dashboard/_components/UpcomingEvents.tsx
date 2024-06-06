import { Event } from "@prisma/client";
import React from "react";

export default function UpcomingEvents({ data }: { data: Event[] | [] }) {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Upcoming This Month</h1>
      <h4 className="text-sm text-muted-foreground">
        Events that are on your calendar this month.
      </h4>
      <div>
        {data?.map((event) => (
          <div key={event.id}>
            <div className="flex items-center justify-between">
              {event.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
