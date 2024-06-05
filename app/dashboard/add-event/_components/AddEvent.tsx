import React from "react";
import AddEventForm from "./AddEventForm";

export default function AddEvent() {
  return (
    <section className="max-w-screen-2xl">
      <h1 className="text-2xl font-semibold">Add Event</h1>
      <h4 className="text-sm text-muted-foreground">
        Add an event to your calendar and we will remind you about it.
      </h4>
      <hr className="my-3" />
      <AddEventForm />
    </section>
  );
}
