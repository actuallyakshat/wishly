import { Event } from "@prisma/client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EventCard from "../../_components/EventCard";
import { EventWithCategory } from "@/lib/types";

interface Category {
  id: number;
  name: string;
  events: EventWithCategory[];
}
export default function CategoryWiseEventsList({
  categories,
  events,
}: {
  categories: any;
  events: EventWithCategory[];
}) {
  console.log(categories);
  return (
    <div>
      <Accordion type="multiple">
        {categories.map((category: Category) => (
          <AccordionItem key={category.id} value={category.id.toString()}>
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <h3>{category.name}</h3>
                <span className="text-sm text-muted-foreground">
                  {category.events.length == 1
                    ? "1 event"
                    : `${category.events.length} events`}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {category.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
                {category.events.length == 0 && (
                  <h1 className="mt-4 text-lg font-medium text-muted-foreground">
                    You have no events in this category.
                  </h1>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem value="all">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <h3>Uncategorised</h3>
              <span className="text-sm text-muted-foreground">
                {events.filter((event) => event.category?.id == null).length ==
                1
                  ? "1 event"
                  : `${events.filter((event) => event.category?.id == null).length} events`}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {events
                .filter((event) => event.category?.id == null)
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {categories.length == 0 && (
        <h1 className="mt-4 text-lg font-medium text-muted-foreground">
          You have not created any categories yet.
        </h1>
      )}
    </div>
  );
}

{
}
