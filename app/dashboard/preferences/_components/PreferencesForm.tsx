"use client";
import React, { useEffect } from "react";
import { SelectEmails } from "./SelectEmails";
import SelectTimezone from "./SelectTimezone";
import FrequencySelction from "./FrequencySelction";
import { Button } from "@/components/ui/button";
import SetName from "./SetName";
import { Email, EmailPreference } from "@prisma/client";
import { useClientAuth } from "@/providers/auth-provider";
import { saveChanges } from "../_actions/actions";

export default function PreferencesForm() {
  const { user } = useClientAuth();
  const [name, setName] = React.useState<string | null>(null);
  const [emails, setEmails] = React.useState<Email[] | []>(user?.emails || []);
  const [emailFrequency, setEmailFrequency] = React.useState<EmailPreference>(
    user!.emailPreferences,
  );
  const [timezone, setTimezone] = React.useState<string>("Asia/Kolkata");
  const [allowSave, setAllowSave] = React.useState(false);

  function compareCommonFields(
    obj1: Record<string, any>,
    obj2: Record<string, any>,
  ): boolean {
    const commonKeys = Object.keys(obj1).filter((key) => key in obj2);
    const res = commonKeys.every((key) => obj1[key] === obj2[key]);
    console.log(res);
    return res;
  }

  function compareArrays(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const payload = {
      emailFrequency,
      userId: user!.id,
      timezone,
      name,
      emails,
    };
    await saveChanges(payload);
    setAllowSave(false);
  }

  useEffect(() => {
    if (user) {
      if (
        user.name !== name ||
        !compareCommonFields(user.emailPreferences, emailFrequency) ||
        user.timeZone !== timezone ||
        !compareArrays(user.emails, emails)
      ) {
        setAllowSave(true);
      } else {
        setAllowSave(false);
      }
    }
  }, [emailFrequency, name, timezone, user, emails]);

  return (
    <form className="max-w-sm space-y-5 py-3">
      <SetName name={name} setName={setName} />
      <SelectEmails allEmails={emails} setAllEmails={setEmails} />
      <SelectTimezone timezoneValue={timezone} setTimezone={setTimezone} />
      <FrequencySelction
        emailFrequency={emailFrequency}
        setEmailFrequency={setEmailFrequency}
      />
      <Button
        disabled={!allowSave}
        variant={"alternative"}
        onSubmit={(e) => e.preventDefault()}
      >
        Save Changes
      </Button>
    </form>
  );
}
