"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useClientAuth } from "@/providers/auth-provider";
import { EmailPreference } from "@prisma/client";
import React, { useEffect } from "react";

const option = [
  {
    id: "onDate",
    name: "On date",
    description: "You will receive a notification on the date of the event",
    value: "emailOnDate",
  },
  {
    id: "oneDayBefore",
    name: "One day before",
    description: "You will receive a notification one day before the event",
    value: "emailOneDayBefore",
  },
  {
    id: "oneWeekBefore",
    name: "One week before",
    description: "You will receive a notification one week before the event",
    value: "emailOneWeekBefore",
  },
];

export default function FrequencySelction({
  emailFrequency,
  setEmailFrequency,
}: {
  emailFrequency: EmailPreference | {};
  setEmailFrequency: React.Dispatch<React.SetStateAction<EmailPreference>>;
}) {
  const { user } = useClientAuth();
  const optionsList = option.map((item: any) => ({
    ...item,
    //@ts-ignore
    checked: user && user.emailPreferences[item.value],
  }));
  const [options, setOptions] = React.useState(optionsList);

  useEffect(() => {
    const newFrequency = options.reduce((acc, option) => {
      acc[option.value] = option.checked;
      return acc;
    }, {} as EmailPreference);

    setEmailFrequency(newFrequency);
  }, [options, setEmailFrequency]);

  return (
    <div className="space-y-3">
      <Label className="text-md">
        <h3>Frequency of notifications</h3>
        <p className="text-sm text-muted-foreground">
          How often should we notifiy you about some event?
        </p>
      </Label>
      <div className="space-y-4">
        {options.map((item: any) => (
          <div className="items-top flex space-x-2" key={item.id}>
            <Checkbox
              id={item.id}
              checked={item.checked}
              onCheckedChange={(checked) => {
                options.map((option) => {
                  if (option.value === item.value) {
                    setOptions((options) =>
                      options.map((o) =>
                        o.value === item.value ? { ...o, checked: checked } : o,
                      ),
                    );
                  }
                });
              }}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={item.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.name}
              </label>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
