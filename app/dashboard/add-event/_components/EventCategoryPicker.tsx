"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import AddCategoryDialog from "./AddCategoryDialog";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useClientAuth } from "@/providers/auth-provider";
import { getAllCategories } from "../_actions/actions";

export function EventCategoryPicker({
  setEventCategory,
}: {
  setEventCategory: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const { user } = useClientAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Category[] | []>([]);
  React.useEffect(() => {
    async function getCategories() {
      if (user) {
        setLoading(true);
        const categories = await getAllCategories(user.id);
        setCategories(categories);
        setLoading(false);
      }
    }
    getCategories();
  }, [user]);

  async function refreshCategories() {
    const categories = await getAllCategories(user!.id);
    setCategories(categories);
  }

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
      <Select onValueChange={(value) => setEventCategory(Number(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Assign a category" />
        </SelectTrigger>
        <SelectContent>
          {!loading &&
            (categories && categories.length > 0 ? (
              categories?.map((category: Category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))
            ) : (
              <h4 className="px-4 py-3 text-sm">No categories found</h4>
            ))}
          {loading && (
            <div className="flex animate-pulse flex-col gap-2 py-1 pl-10 pr-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-6 w-full rounded-lg bg-gray-200"
                ></div>
              ))}
            </div>
          )}
          <hr className="my-1" />
          <AddCategoryDialog refresh={refreshCategories} />
        </SelectContent>
      </Select>
    </div>
  );
}
