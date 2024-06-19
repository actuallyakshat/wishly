import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import CRUDButtons from "./CRUDButtons";
import Link from "next/link";

export default async function CategoriesList() {
  const user = await currentUser();
  const userDetails = await prisma.user.findUnique({
    where: {
      primaryEmail: user?.primaryEmailAddress?.emailAddress,
    },
    include: {
      categories: {
        include: {
          events: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });
  return (
    <div className="mt-4 w-full">
      {userDetails?.categories && userDetails?.categories.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {userDetails?.categories.map((category) => (
            <div key={category.id} className="relative">
              <Link href={"/dashboard/category/" + category.id}>
                <div className="flex w-full items-center justify-between rounded-lg border bg-muted/20 p-4 shadow-sm transition-all duration-300 hover:bg-muted/60">
                  <div>
                    <h1 className="text-lg font-semibold">{category.name}</h1>
                    <h4 className="text-sm text-muted-foreground">
                      {category.events.length > 0 &&
                        (category.events.length !== 1
                          ? category.events.length + " Events"
                          : category.events.length + " Event")}
                      {category.events.length === 0 && (
                        <span className="text-sm text-muted-foreground">
                          No Events
                        </span>
                      )}
                    </h4>
                  </div>

                  <CRUDButtons
                    categories={userDetails.categories}
                    name={category.name}
                    id={category.id}
                    userId={userDetails.id}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-lg text-muted-foreground">
          You have not created any categories yet.
        </h2>
      )}
    </div>
  );
}
