import React from "react";
import GobackButton from "./_components/GobackButton";
import CategoriesList from "./_components/CategoriesList";
export default function page() {
  return (
    <main className="p-12">
      <GobackButton />
      <h1 className="text-2xl font-semibold">Manage Categories</h1>
      <h4 className="text-sm text-muted-foreground">
        A list of all your event categories
      </h4>
      <CategoriesList />
    </main>
  );
}
