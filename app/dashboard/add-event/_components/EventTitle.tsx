import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function EventTitle({
  setEventTitle,
}: {
  setEventTitle: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="space-y-2">
      <Label>Title</Label>
      <Input
        placeholder="Event Title"
        onChange={(e) => setEventTitle(e.target.value)}
      />
    </div>
  );
}
