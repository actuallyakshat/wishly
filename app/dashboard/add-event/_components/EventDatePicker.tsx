"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

export function EventDatePicker({
  eventDate,
  setEventDate,
}: {
  eventDate: Date | undefined;
  setEventDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  return (
    <div className="space-y-2">
      <Label>Date</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !eventDate && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {eventDate ? format(eventDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            fromDate={new Date()}
            mode="single"
            selected={eventDate}
            onSelect={(date) => setEventDate(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
