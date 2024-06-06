"use client";
import React from "react";
import { EventDatePicker } from "./EventDatePicker";
import { EventCategoryPicker } from "./EventCategoryPicker";
import { Button } from "@/components/ui/button";
import RecuringCheckbox from "./RecuringCheckbox";
import Description from "./Description";
import { LoaderCircle } from "lucide-react";
import EventTitle from "./EventTitle";
import { CheckedState } from "@radix-ui/react-checkbox";
import { toast } from "sonner";
import { addEvent } from "../_actions/actions";
import { useClientAuth } from "@/providers/auth-provider";

export default function AddEventForm() {
  const [eventTitle, setEventTitle] = React.useState<string>("");
  const [eventDescription, setEventDescription] = React.useState<string>("");
  const [eventDate, setEventDate] = React.useState<Date | undefined>(undefined);
  const [eventCategory, setEventCategory] = React.useState<number | null>(null);
  const [recurring, setRecurring] = React.useState<CheckedState>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { user } = useClientAuth();

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!eventTitle || !eventDate) {
      setIsLoading(false);
      toast.error("Please fill all the required fields");
      return;
    }

    if (!recurring && eventDate.getTime() < Date.now()) {
      setIsLoading(false);
      toast.error("A non-recurring event can't have a date in the past");
      return;
    }
    setIsLoading(true);
    const payload = {
      name: eventTitle,
      date: eventDate,
      description: eventDescription,
      category: eventCategory,
      recurring: recurring,
    };

    try {
      await addEvent(payload, user!.id);
      toast.success("Event added successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the event");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form
      className="flex max-w-sm flex-col gap-6 py-3"
      onSubmit={(e) => handleSubmit(e)}
    >
      <EventTitle setEventTitle={setEventTitle} />
      <Description setEventDescription={setEventDescription} />
      <EventDatePicker eventDate={eventDate} setEventDate={setEventDate} />
      <EventCategoryPicker setEventCategory={setEventCategory} />
      <RecuringCheckbox setRecurring={setRecurring} />
      <Button className="w-fit" variant={"alternative"} type="submit">
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Add Event"}
      </Button>
    </form>
  );
}
