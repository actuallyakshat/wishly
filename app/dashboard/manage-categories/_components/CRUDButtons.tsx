"use client";
import { Button } from "@/components/ui/button";
import { Edit2Icon, LoaderCircle, TrashIcon } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { editCategory, removeCategory } from "../_actions/actions";
import { Category } from "@prisma/client";
import { toast } from "sonner";

export default function CRUDButtons({
  name,
  id,
  categories,
  userId,
}: {
  name: string;
  id: number;
  categories: Category[];
  userId: number;
}) {
  const [newName, setNewName] = React.useState(name);
  const [loading, setLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form...");
    setLoading(true);
    try {
      const res = await editCategory(userId, id, newName);
      if (res.success) {
        setLoading(false);
        setOpenEditModal(false);
        console.log("Category updated successfully");
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log("error", e);
    }
  };

  const handleDeleteCategory = async () => {
    setDeleteLoading(true);
    try {
      const res = await removeCategory(id);
      setOpenDeleteModal(false);
      console.log(res);
    } catch (e) {
      console.log("error", e);
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogTrigger asChild>
          <Button
            variant={"link"}
            className="h-fit p-0"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setOpenEditModal(true);
            }}
          >
            <Edit2Icon size={18} className="cursor-pointer" />
          </Button>
        </DialogTrigger>
        <DialogContent className="pb-3 pt-6">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Edit the name of the category</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateCategory}>
            <Input
              type="text"
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New Category Name"
              value={newName}
            />
            <div
              className="mt-2 flex w-full justify-end"
              onClick={(e) => e.stopPropagation()}
            >
              <Button type="submit" variant={"alternative"}>
                {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogTrigger asChild>
          <Button
            variant={"link"}
            className="h-fit p-0"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setOpenDeleteModal(true);
            }}
          >
            <TrashIcon size={18} className="cursor-pointer" />
          </Button>
        </DialogTrigger>
        <DialogContent className="pb-3 pt-6">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              You are about to delete this category. All events under this
              category will be deleted labelled as uncategorized.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button
                variant={"secondary"}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant={"alternative"}
              disabled={deleteLoading}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDeleteCategory();
              }}
            >
              {deleteLoading ? (
                <LoaderCircle className="animate-spin" size={18} />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
