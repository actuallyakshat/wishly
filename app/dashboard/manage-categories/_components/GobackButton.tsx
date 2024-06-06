"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function GobackButton() {
  const router = useRouter();
  return (
    <Button
      variant={"link"}
      onClick={() => router.back()}
      className="mb-4 h-fit p-0"
    >
      Go back
    </Button>
  );
}
