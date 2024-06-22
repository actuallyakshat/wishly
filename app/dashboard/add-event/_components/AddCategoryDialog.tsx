"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClientAuth } from "@/providers/auth-provider";
import React from "react";
import { addCategory } from "../_actions/actions";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export default function AddCategoryDialog({
  refresh,
}: {
  refresh?: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [name, setName] = React.useState("");
  const { user } = useClientAuth();
  async function handleCreateCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      if (name === "") {
        setError("Category name is required");
      }
      const existingCategoryName = user?.categories.find(
        (c) => c.name.toLowerCase() === name.toLowerCase(),
      );
      if (existingCategoryName) {
        toast.error("Category already exists", { id: "create-category" });
        setLoading(false);
        return;
      }
      toast.loading("Creating category", { id: "create-category" });
      await addCategory(name, user!.id);
      if (refresh) await refresh();
      toast.success("Category created successfully", { id: "create-category" });
      setIsOpen(false);
    } catch (error) {
      toast.error("Error creating category", { id: "create-category" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full py-1" variant={"ghost"}>
          Create new category
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="pb-4 pt-6">
        <AlertDialogHeader>
          <AlertDialogTitle>Create new category</AlertDialogTitle>
          <AlertDialogDescription>
            Create a new category so that you can organise your events better.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form className="mt-3" onSubmit={(e) => handleCreateCategory(e)}>
          <div className="space-y-3">
            <Label>Category Name</Label>
            {error && <p className="text-red-500">{error}</p>}
            <Input
              placeholder="Festivals"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="mt-1 flex w-full items-center justify-end">
              <Button
                type="submit"
                className="w-full"
                variant={"alternative"}
                disabled={loading}
              >
                {loading ? <LoaderCircle className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
