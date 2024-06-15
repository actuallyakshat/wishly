"use client";
import React, { useEffect } from "react";
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
import ViewEventModal from "./ViewEventModal";
import { EventWithCategory } from "@/lib/types";
import { EventCategoryPicker } from "../add-event/_components/EventCategoryPicker";
import { Category } from "@prisma/client";
import RecuringCheckbox from "../add-event/_components/RecuringCheckbox";
import { CheckedState } from "@radix-ui/react-checkbox";
export default function EventOptions({ event }: { event: EventWithCategory }) {
  const [description, setDescription] = React.useState(event.description || "");
  const [date, setDate] = React.useState<Date | undefined>(event.date);
  const [name, setName] = React.useState(event.name);
  const [eventCategory, setEventCategory] = React.useState<number | null>(
    event.category?.id || null,
  );
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [recurring, setRecurring] = React.useState<CheckedState | null>(
    event.reccuring,
  );
  const [notifications, setNotifications] = React.useState(
    event.disableReminder ? "Enable Notification" : "Disable Notification",
  );
  const [toggleNotificationLoading, setToggleNotificationLoading] =
    React.useState(false);

  useEffect(() => {
    console.log(recurring);
  }, [recurring]);

  async function handleUpdateEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      console.log("recurring", recurring);
      const payload = {
        id: event.id,
        name: name,
        description: description,
        date: date,
        categoryId: eventCategory,
        recurring: recurring,
      };
      console.log("payload", payload);
      toast.loading("Updating event...", { id: "update-event" });
      const success = await editEvent(payload);
      console.log(success);
      if (success) {
        toast.success("Event updated successfully", { id: "update-event" });
      }
    } catch (e) {
      console.log(e);
      toast.error("Error updating event", { id: "update-event" });
    } finally {
      setUpdateLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setDeleteLoading(true);
      toast.loading("Deleting event...", { id: "delete-event" });
      const success = await deleteEvent(event.id);
      if (success) {
        toast.success("Event deleted successfully", { id: "delete-event" });
      }
    } catch (e) {
      console.log(e);
      toast.error("Error deleting event", { id: "delete-event" });
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
    }
  }

  useEffect(() => {
    if (event.disableReminder) {
      setNotifications("Enable Notification");
    } else {
      setNotifications("Disable Notification");
    }
    setToggleNotificationLoading(false);
  }, [event.disableReminder]);

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
          <ViewEventModal event={event} />
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
                className="flex flex-col gap-5"
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

                <EventCategoryPicker
                  defaultCategory={event.category}
                  setEventCategory={setEventCategory}
                />

                <RecuringCheckbox
                  setRecurring={setRecurring}
                  defaultChecked={event.reccuring}
                />

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
            ) : (
              notifications
            )}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
