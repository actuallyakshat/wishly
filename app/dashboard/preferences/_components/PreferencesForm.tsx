import React from "react";
import { SelectEmails } from "./SelectEmails";
import SelectTimezone from "./SelectTimezone";
import FrequencySelction from "./FrequencySelction";
import { Button } from "@/components/ui/button";

export default function PreferencesForm() {
  return (
    <form className="mt-8 space-y-5">
      <SelectEmails />
      <SelectTimezone />
      <FrequencySelction />
      <Button variant={"alternative"}>Save Changes</Button>
    </form>
  );
}
