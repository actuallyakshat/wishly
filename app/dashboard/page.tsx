"use client";
import { useClientAuth } from "@/providers/auth-provider";
import React from "react";
export default function Dashboard() {
  const { isAuthenticated } = useClientAuth();
  return (
    <main>
      <section className="text-3xl font-extrabold">
        <h1>Authenticated {isAuthenticated ? "✅" : "❌"}</h1>
      </section>
    </main>
  );
}
