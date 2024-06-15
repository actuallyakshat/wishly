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

export default function CRUDButtons({
  name,
  id,
}: {
  name: string;
  id: number;
}) {
  const [newName, setNewName] = React.useState(name);
  const [loading, setLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await editCategory(id, newName);
      if (res) {
        setLoading(false);
        setOpenEditModal(false);
      } else {
        console.log("Something went wrong");
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
    <div
      className="flex items-center justify-center gap-3"
      onClick={(e) => e.preventDefault()}
    >
      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogTrigger asChild>
          <Button variant={"link"} className="h-fit p-0">
            <Edit2Icon size={18} className="cursor-pointer" />
          </Button>
        </DialogTrigger>
        <DialogContent className="pb-3 pt-6">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Edit the name of the category</DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => handleUpdateCategory(e)}>
            <Input
              type="text"
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New Category Name"
              defaultValue={name}
            />
            <div className="mt-2 flex justify-end">
              <Button type="submit" variant={"alternative"}>
                {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogTrigger asChild>
          <Button variant={"link"} className="h-fit p-0">
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
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              variant={"alternative"}
              disabled={deleteLoading}
              onClick={() => handleDeleteCategory()}
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
