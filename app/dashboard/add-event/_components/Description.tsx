import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
export default function Description({
  setEventDescription,
}: {
  setEventDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="space-y-2">
      <Label>Description</Label>
      <Textarea
        placeholder="Event Description (Optional)"
        onChange={(e) => setEventDescription(e.target.value)}
      />
    </div>
  );
}