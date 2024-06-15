import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventWithCategory } from "@/lib/types";
import React from "react";
import EventCard from "../../_components/EventCard";

export default function SearchResults({
  events,
  searchQuery,
  setSearchQuery,
  filteredEvents,
}: {
  events: EventWithCategory[];
  filteredEvents: EventWithCategory[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="fixed inset-0 z-[49] h-screen w-full bg-background/30 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-screen-xl pt-10">
        <div className="mx-auto flex w-full max-w-lg items-center gap-4">
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="cols-span-3"
          />
          <Button
            onClick={() => setSearchQuery("")}
            variant={"link"}
            className="col-span-1"
          >
            Clear
          </Button>
        </div>
        <div>
          {filteredEvents.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="mt-5 text-center">
              <p className="text-lg font-medium text-muted-foreground">
                No results found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
