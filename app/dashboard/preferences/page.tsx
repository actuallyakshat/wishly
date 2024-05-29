import React from "react";
import PreferencesForm from "./_components/PreferencesForm";

export default function Preferences() {
  return (
    <main>
      <div className="mt-8 px-10 max-w-screen-2xl">
        <h1 className="text-2xl font-semibold">Preferences</h1>
        <p className="text-muted-foreground">
          You can change your preferences here.
        </p>
        <hr className="my-3" />
        <PreferencesForm />
      </div>
    </main>
  );
}
