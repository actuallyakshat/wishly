import React from "react";
import UpcomingEvents from "./_components/UpcomingEvents";
import AllEvents from "./_components/AllEvents";
import EvenetsByCategory from "./_components/EvenetsByCategory";
export default function Dashboard() {
  return (
    <main className="flex flex-col gap-8 p-12">
      <UpcomingEvents />
      <AllEvents />
      <EvenetsByCategory />
    </main>
  );
}
