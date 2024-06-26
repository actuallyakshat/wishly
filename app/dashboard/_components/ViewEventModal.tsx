import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EventWithCategory } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { BellOff } from "lucide-react";
import { useClientAuth } from "@/providers/auth-provider";
import moment from "moment-timezone";
export default function ViewEventModal({
  event,
}: {
  event: EventWithCategory;
}) {
  const { user } = useClientAuth();
  console.log(event);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="menuBtn">
          View
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            {event.name}
            {event.disableReminder ? (
              <BellOff size={16} className="text-muted-foreground" />
            ) : null}
          </DialogTitle>
          <div className="mt-1 flex items-center gap-3">
            <Badge>
              {moment(event.date)
                .tz(user?.timeZone || "UTC")
                .format("Do MMMM")}
            </Badge>
            {event.category?.name ? (
              <Badge>{event.category?.name}</Badge>
            ) : (
              <Badge>Uncategorized</Badge>
            )}
          </div>
          {event.description && (
            <DialogDescription className="pt-2">
              {event.description}
            </DialogDescription>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
