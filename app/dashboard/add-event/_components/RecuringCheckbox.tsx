import React, { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

export default function RecuringCheckbox({
  setRecurring,
  defaultChecked,
}: {
  setRecurring: React.Dispatch<React.SetStateAction<CheckedState | null>>;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex gap-2">
      {defaultChecked == false ? (
        <Checkbox
          className="mt-1"
          defaultChecked={false}
          onCheckedChange={(checked) => {
            setRecurring(checked);
          }}
        />
      ) : (
        <Checkbox
          className="mt-1"
          defaultChecked={true}
          onCheckedChange={(checked) => {
            setRecurring(checked);
          }}
        />
      )}

      <span>
        <h1 className="text-sm font-semibold">Recurring Event?</h1>
        <h4 className="text-sm text-muted-foreground">
          You will be reminded annually
        </h4>
      </span>
    </div>
  );
}
