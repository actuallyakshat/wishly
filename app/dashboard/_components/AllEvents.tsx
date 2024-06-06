"use client";
import React, { use, useEffect } from "react";
import { Event } from "@prisma/client";
import { Input } from "@/components/ui/input";

export default function AllEvents({ allEvents }: { allEvents: Event[] | [] }) {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [filteredEvents, setFilteredEvents] = React.useState<Event[] | []>([]);
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredEvents([]);
    }
    if (searchQuery) {
      setFilteredEvents(
        allEvents.filter((event) => {
          return event.name.toLowerCase().includes(searchQuery.toLowerCase());
        }),
      );
    }
  }, [searchQuery, allEvents]);

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-2">
        <div>
          <h1 className="text-2xl font-semibold">All Events</h1>
          <h4 className="text-sm text-muted-foreground">
            All events that you have saved on Wishly.
          </h4>
        </div>
        <div>
          <Input
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        {!searchQuery &&
          allEvents?.map((event) => (
            <div key={event.id}>
              <div className="flex items-center justify-between">
                {event.name}
              </div>
            </div>
          ))}
        {searchQuery ? (
          filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id}>
                <div className="flex items-center justify-between">
                  {event.name}
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-sm text-muted-foreground">No events found.</h1>
          )
        ) : null}
      </div>
    </section>
  );
}
