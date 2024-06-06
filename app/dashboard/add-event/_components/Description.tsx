import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
export default function Description() {
  return (
    <div className="space-y-2">
      <Label>Description</Label>
      <Textarea placeholder="Event Description (Optional)" />
    </div>
  );
}
