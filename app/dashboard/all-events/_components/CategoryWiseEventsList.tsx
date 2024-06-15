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
  data,
  categories,
}: {
  data: EventWithCategory[];
  categories: any;
}) {
  console.log(categories);
  return (
    <div>
      <Accordion type="single" collapsible>
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
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
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
