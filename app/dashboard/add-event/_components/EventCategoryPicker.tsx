import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import AddCategoryDialog from "./AddCategoryDialog";
import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function EventCategoryPicker() {
  const user = await currentUser();
  const response = await prisma.user.findFirst({
    where: { primaryEmail: user?.primaryEmailAddress?.emailAddress },
    include: {
      categories: true,
    },
  });
  const categories = response?.categories;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Category</Label>
        <Link href="/dashboard/manage-categories">
          <Button variant={"link"} className="h-fit p-0">
            Manage
          </Button>
        </Link>
      </div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Assign a category" />
        </SelectTrigger>
        <SelectContent>
          {categories && categories.length > 0 ? (
            categories?.map((category: Category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))
          ) : (
            <h4 className="px-4 py-3 text-sm">No categories found</h4>
          )}
          <hr className="my-1" />
          <AddCategoryDialog />
        </SelectContent>
      </Select>
    </div>
  );
}
