"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

const timezones = [
  //asia
  {
    value: "Asia/Kolkata",
    label: "Asia/Kolkata",
  },
  {
    //america
    value: "America/New_York",
    label: "America/New York",
  },
  //australia
  {
    value: "Australia/Sydney",
    label: "Australia/Sydney",
  },
  //europe
  {
    value: "Europe/London",
    label: "Europe/London",
  },
  {
    value: "Asia/Singapore",
    label: "Asia/Singapore",
  },
];

type Timezone = {
  value: string;
  label: string;
};

export default function SelectTimezone({
  timezoneValue,
  setTimezone,
}: {
  timezoneValue: string;
  setTimezone: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [timezoneList, setTimezoneList] = React.useState<Timezone[]>(timezones);

  return (
    <div className="space-y-3">
      <Label className="text-md">
        <h4>Timezone</h4>
        <p className="text-sm text-muted-foreground">
          Select your current timezone so that we can send you notification on
          time.
        </p>
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {timezoneValue
              ? timezoneList.find((timezone) => timezone.value == timezoneValue)
                  ?.label
              : "Select timezone..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[24rem] p-0">
          <Command>
            <CommandInput placeholder="Search timezone..." />
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {timezoneList.map((timezone) => (
                  <CommandItem
                    key={timezone.value}
                    value={timezone.value}
                    onSelect={(currentValue) => {
                      setTimezone(
                        currentValue === timezoneValue ? "" : currentValue,
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        timezoneValue === timezone.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {timezone.label}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
