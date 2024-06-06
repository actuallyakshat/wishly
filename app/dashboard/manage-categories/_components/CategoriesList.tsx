import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import CRUDButtons from "./CRUDButtons";

export default async function CategoriesList() {
  const user = await currentUser();
  const userDetails = await prisma.user.findUnique({
    where: {
      primaryEmail: user?.primaryEmailAddress?.emailAddress,
    },
    include: {
      categories: {
        include: {
          events: true,
        },
      },
    },
  });
  return (
    <div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {userDetails?.categories ? (
        userDetails?.categories.map((category) => (
          <div
            key={category.id}
            className="flex w-full items-center justify-between rounded-lg border bg-muted/20 p-4 shadow-sm"
          >
            <div>
              <h1 className="text-lg font-semibold">{category.name}</h1>
              <h4 className="text-sm text-muted-foreground">
                {category.events.length} events
              </h4>
            </div>
            <CRUDButtons name={category.name} id={category.id} />
          </div>
        ))
      ) : (
        <h2 className="text-xl text-muted-foreground">No categories</h2>
      )}
    </div>
  );
}
