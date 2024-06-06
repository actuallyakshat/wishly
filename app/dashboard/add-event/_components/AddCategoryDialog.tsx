"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClientAuth } from "@/providers/auth-provider";
import React from "react";
import { addCategory } from "../_actions/actions";
import { LoaderCircle } from "lucide-react";

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
      await addCategory(name, user!.id);
      if (refresh) await refresh();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full py-1" variant={"ghost"}>
          Create new category
        </Button>
      </DialogTrigger>
      <DialogContent className="pb-4 pt-6">
        <DialogHeader>
          <DialogTitle>Create new category</DialogTitle>
          <DialogDescription>
            Create a new category so that you can organise your events better.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-3" onSubmit={(e) => handleCreateCategory(e)}>
          <div className="space-y-3">
            <Label>Category Name</Label>
            {error && <p className="text-red-500">{error}</p>}
            <Input
              placeholder="Festivals"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="mt-1 flex w-full items-center justify-end">
              <Button type="submit" variant={"alternative"} disabled={loading}>
                {loading ? <LoaderCircle className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
