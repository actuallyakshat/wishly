"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ellipsis, LoaderCircle } from "lucide-react";
import { Event } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditDatePicker } from "./EditDatePicker";
import {
  deleteEvent,
  editEvent,
  toggleNotification,
} from "../_actions/actions";
import { toast } from "sonner";
export default function EventOptions({ event }: { event: Event }) {
  const [description, setDescription] = React.useState(event.description || "");
  const [date, setDate] = React.useState<Date | undefined>(event.date);
  const [name, setName] = React.useState(event.name);
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [toggleNotificationLoading, setToggleNotificationLoading] =
    React.useState(false);

  async function handleUpdateEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      const payload = {
        id: event.id,
        name: name,
        description: description,
        date: date,
      };
      console.log(payload);
      const success = await editEvent(payload);
      console.log(success);
      if (success) {
        toast.success("Event updated successfully");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setUpdateLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setDeleteLoading(true);
      const success = await deleteEvent(event.id);
      if (success) {
        toast.success("Event deleted successfully");
      }
    } catch (e) {
      console.log(e);
      setDeleteLoading(false);
    }
  }

  async function handleToggleNotification() {
    try {
      setToggleNotificationLoading(true);
      const success = await toggleNotification(event.id);
      if (success) {
        toast.success("Notification toggled successfully");
      }
    } catch (e) {
      console.log(e);
      setToggleNotificationLoading(false);
    } finally {
      setToggleNotificationLoading(false);
    }
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Ellipsis
            size={18}
            className="cursor-pointer text-muted-foreground transition-colors hover:text-primary"
          />
        </PopoverTrigger>
        <PopoverContent className="flex w-fit flex-col gap-1 px-1 py-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"ghost"} className="menuBtn">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="pb-4 pt-6">
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogDescription>
                  Edit the details of the event.
                </DialogDescription>
              </DialogHeader>
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => handleUpdateEvent(e)}
              >
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    defaultValue={event.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label>Description</Label>
                    <span
                      className={`text-sm text-muted-foreground ${
                        description.length >= 120 ? "text-red-500" : ""
                      }`}
                    >
                      {description.length}/120
                    </span>
                  </div>
                  <Textarea
                    defaultValue={event.description || ""}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={120}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <EditDatePicker date={date} setDate={setDate} />
                </div>
                <div className="flex items-center justify-end">
                  <Button
                    type="submit"
                    variant={"alternative"}
                    disabled={updateLoading}
                  >
                    {updateLoading ? (
                      <LoaderCircle size={16} className="animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"ghost"} className="menuBtn">
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent className="pb-4 pt-6">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  You are about to delete this event. This action cannot be
                  undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex w-full items-center justify-end">
                <Button
                  variant={"alternative"}
                  type="submit"
                  onClick={handleDelete}
                >
                  {deleteLoading ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant={"ghost"}
            className="menuBtn"
            onClick={handleToggleNotification}
          >
            {toggleNotificationLoading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : event.disableReminder ? (
              "Enable Notification"
            ) : (
              "Disable Notification"
            )}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
