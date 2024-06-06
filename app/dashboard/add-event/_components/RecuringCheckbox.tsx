import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function RecuringCheckbox() {
  return (
    <div className="flex gap-2">
      <Checkbox className="mt-1" defaultChecked />
      <span>
        <h1 className="text-sm font-semibold">Recurring Event?</h1>
        <h4 className="text-sm text-muted-foreground">
          You will be reminded annually
        </h4>
      </span>
    </div>
  );
}
