"use client";
import React, { use, useEffect } from "react";
import { Event } from "@prisma/client";
import { Input } from "@/components/ui/input";
import EventCard from "./EventCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link href="/dashboard/all-events">
            <Button variant={"alternative"} className="w-full sm:w-fit">
              Show all events
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {!searchQuery &&
          allEvents?.map((event) => <EventCard key={event.id} event={event} />)}
        {searchQuery ? (
          filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <h1 className="text-sm text-muted-foreground">No events found.</h1>
          )
        ) : null}
      </div>
    </section>
  );
}
