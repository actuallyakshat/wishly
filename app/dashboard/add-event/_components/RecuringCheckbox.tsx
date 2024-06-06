import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

export default function RecuringCheckbox({
  setRecurring,
}: {
  setRecurring: React.Dispatch<React.SetStateAction<CheckedState>>;
}) {
  return (
    <div className="flex gap-2">
      <Checkbox
        className="mt-1"
        defaultChecked
        onCheckedChange={(checked) => {
          setRecurring(checked);
        }}
      />
      <span>
        <h1 className="text-sm font-semibold">Recurring Event?</h1>
        <h4 className="text-sm text-muted-foreground">
          You will be reminded annually
        </h4>
      </span>
    </div>
  );
}
