import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
export default function Description({
  description,
  setEventDescription,
}: {
  description: string;
  setEventDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Description</Label>
        <p
          className={`text-sm font-medium text-muted-foreground ${description.length == 120 ? "text-red-500" : ""}`}
        >
          {description.length}/120
        </p>
      </div>
      <Textarea
        maxLength={120}
        value={description}
        placeholder="Event Description (Optional)"
        onChange={(e) => setEventDescription(e.target.value)}
      />
    </div>
  );
}
