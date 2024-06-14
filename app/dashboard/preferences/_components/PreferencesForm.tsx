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
import { toast } from "sonner";

export default function PreferencesForm() {
  const { user, refreshUser } = useClientAuth();
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState<string | null>(user?.name || null);
  const [emails, setEmails] = React.useState<Email[] | []>(user?.emails || []);
  const [emailFrequency, setEmailFrequency] = React.useState<
    EmailPreference | {}
  >(user?.emailPreferences || {});
  const [timezone, setTimezone] = React.useState<string>(
    user?.timeZone || "Asia/Kolkata",
  );
  const [allowSave, setAllowSave] = React.useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmails(user.emails);
      setEmailFrequency(user.emailPreferences);
    }
  }, [user]);

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
      const obj1 = arr1[i];
      const obj2 = arr2[i];
      if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
        return false;
      }
    }
    return true;
  }
  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      const payload = {
        emailFrequency,
        userId: user!.id,
        timezone,
        name,
        emails,
      };
      setLoading(true);
      await saveChanges(payload);
      await refreshUser();
      toast.success("Changes saved successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setAllowSave(false);
    }
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

  if (
    !user ||
    !user.name ||
    !user.emails ||
    !user.emailPreferences ||
    !user.timeZone
  ) {
    return (
      <h1 className="text-xl font-semibold text-muted-foreground">
        Loading...
      </h1>
    );
  }
  return (
    <form className="max-w-sm space-y-5 py-3" onSubmit={(e) => handleSubmit(e)}>
      <SetName name={name} setName={setName} />
      <SelectEmails allEmails={emails} setAllEmails={setEmails} />
      <SelectTimezone timezoneValue={timezone} setTimezone={setTimezone} />
      <FrequencySelction
        emailFrequency={emailFrequency}
        setEmailFrequency={setEmailFrequency}
      />
      <Button
        disabled={!allowSave || loading}
        variant={"alternative"}
        type="submit"
      >
        {loading ? "Saving" : "Save Changes"}
      </Button>
    </form>
  );
}
