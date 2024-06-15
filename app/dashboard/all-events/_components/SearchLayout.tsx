"use client";
import { Input } from "@/components/ui/input";
import { EventWithCategory } from "@/lib/types";
import React from "react";
import SearchResults from "./SearchResults";
import { Label } from "@/components/ui/label";

export default function SearchLayout({
  events,
}: {
  events: EventWithCategory[];
}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredEvents, setFilteredEvents] = React.useState<
    EventWithCategory[]
  >([]);
  React.useEffect(() => {
    if (searchQuery) {
      const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredEvents(filteredEvents);
      setSearchQuery(searchQuery);
    }
    if (!searchQuery) {
      setFilteredEvents([]);
    }
  }, [searchQuery, events]);
  return (
    <div>
      <div className="flex items-center gap-3">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {searchQuery ? (
        <SearchResults
          events={filteredEvents}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredEvents={filteredEvents}
        />
      ) : null}
    </div>
  );
}
