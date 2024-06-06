import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { EventDatePicker } from "./EventDatePicker";
import { EventCategoryPicker } from "./EventCategoryPicker";
import { Button } from "@/components/ui/button";
import RecuringCheckbox from "./RecuringCheckbox";
import Description from "./Description";

export default function AddEventForm() {
  return (
    <form className="flex max-w-sm flex-col gap-6 py-3">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input placeholder="Event Title" />
      </div>
      <Description />
      <EventDatePicker />
      <EventCategoryPicker />
      <RecuringCheckbox />
      <Button className="w-fit" variant={"alternative"}>
        Create Event
      </Button>
    </form>
  );
}
