"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClientAuth } from "@/providers/auth-provider";
import React, { useEffect } from "react";

export default function SetName({
  name,
  setName,
}: {
  name: string | null;
  setName: (name: string | null) => void;
}) {
  const { user } = useClientAuth();
  useEffect(() => {
    console.log("name", typeof name);
  }, [name]);
  return (
    <div className="w-full">
      <Label>Name</Label>
      <h4 className="mt-1 text-sm text-muted-foreground">
        Hey Stranger! We would love to know your name.
      </h4>
      <Input
        type="text"
        defaultValue={user?.name || ""}
        placeholder="John Doe"
        onChange={(e) => {
          const inputValue = e.target.value;
          if (inputValue === "") {
            setName(null);
          } else {
            setName(inputValue);
          }
        }}
        className="mt-3"
      />
    </div>
  );
}
