"use client";
import { Button } from "@/components/ui/button";
import { testEmail } from "@/lib/email-methods/emailMethods";
import React from "react";

export default function Test() {
  return <Button onClick={() => testEmail()}>Test Email</Button>;
}
