import { Event } from "@prisma/client";
import React from "react";
import EventCard from "../../_components/EventCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EventWithCategory } from "@/lib/types";

type MonthlyData = {
  [key: string]: EventWithCategory[];
};

export default function MonthWiseEventsList({
  data,
}: {
  data: EventWithCategory[];
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthlyData: MonthlyData = months.reduce((acc, month) => {
    acc[month] = [];
    return acc;
  }, {} as MonthlyData);

  data.forEach((event) => {
    const monthName = months[event.date.getMonth()];
    monthlyData[monthName].push(event);
  });

  return (
    <div>
      {months.map((month) => (
        <div key={month} className="mt-4">
          <Accordion type="single" collapsible>
            <AccordionItem value={month}>
              <AccordionTrigger className="flex items-center justify-start gap-3">
                <h2 className="text-lg font-medium">{month}</h2>
                <span className="text-sm text-muted-foreground no-underline">
                  {monthlyData[month].length == 1
                    ? "1 event"
                    : `${monthlyData[month].length} events`}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {monthlyData[month].length !== 0 ? (
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {monthlyData[month].map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <h3 className="text-muted-foreground">No events found.</h3>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
