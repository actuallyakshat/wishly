import React from "react";
import GobackButton from "./_components/GobackButton";
import CategoriesList from "./_components/CategoriesList";
import AddCategoryDialog from "../add-event/_components/AddCategoryDialog";
export default function page() {
  return (
    <main className="mx-auto max-w-screen-2xl p-12">
      <GobackButton />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Manage Categories</h1>
          <h4 className="text-sm text-muted-foreground">
            A list of all your event categories
          </h4>
        </div>
        <div>
          <AddCategoryDialog />
        </div>
      </div>

      <CategoriesList />
    </main>
  );
}
