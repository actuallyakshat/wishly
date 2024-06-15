import { BellOff } from "lucide-react";
import React from "react";
import EventOptions from "./EventOptions";
import { EventWithCategory } from "@/lib/types";
import { Event } from "@prisma/client";

export default function EventCard({ event }: { event: EventWithCategory }) {
  return (
    <div
      key={event.id}
      className="w-full overflow-hidden rounded-lg border bg-background p-4 shadow-sm"
    >
      <div className="flex h-full w-full items-center justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="flex items-center gap-2 truncate text-lg font-semibold">
            {event.name}{" "}
            {event.disableReminder ? (
              <BellOff size={16} className="text-muted-foreground" />
            ) : null}
          </h2>

          {event.description && (
            <h4 className="truncate pr-3 text-sm text-muted-foreground">
              {event.description}
            </h4>
          )}
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <h4 className="text-sm text-muted-foreground">
            {event.date.toLocaleDateString(undefined, {
              day: "numeric",
              month: "numeric",
            })}
          </h4>
          <EventOptions event={event} />
        </div>
      </div>
    </div>
  );
}
