import { Event } from "@prisma/client";
import React from "react";
import EventCard from "./EventCard";

export default function UpcomingEvents({ data }: { data: Event[] | [] }) {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Upcoming This Month</h1>
      <h4 className="text-sm text-muted-foreground">
        Events that are on your calendar this month.
      </h4>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {data?.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  );
}
