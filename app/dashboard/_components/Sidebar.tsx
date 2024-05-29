"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ThemeToggler } from "./ThemeToggler";
import { CalendarHeart, LogOut, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

const sidebarItems = [
  {
    id: 1,
    name: "Dashboard",
    icon: <CalendarHeart />,
    href: "/dashboard",
  },
  {
    id: 2,
    name: "Preferences",
    icon: <Settings2 />,
    href: "/dashboard/preferences",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="w-72 fixed left-0 top-0 h-screen border-r flex flex-col justify-between pt-10 pb-4">
      <div>
        <h1 className="text-3xl font-black px-4 mb-5">Wishly</h1>
        {sidebarItems.map((item) => (
          <Link
            href={item.href}
            key={item.id}
            className={`flex items-center gap-3 p-4 text-sm font-medium hover:bg-secondary/30 cursor-pointer ${
              pathname == item.href
                ? "bg-secondary/50"
                : "text-muted-foreground"
            }`}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </div>
      <div>
        <ThemeToggler />
        <SignOut />
      </div>
    </div>
  );
}

function SignOut() {
  return (
    <SignOutButton>
      <Button
        className="w-full hover:bg-secondary/40 flex items-center justify-start gap-2 p-4 text-muted-foreground"
        variant={"ghost"}
        size={"custom"}
      >
        <LogOut />
        Sign Out
      </Button>
    </SignOutButton>
  );
}
