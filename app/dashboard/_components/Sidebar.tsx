"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { ThemeToggler } from "./ThemeToggler";
import {
  CalendarHeart,
  LogOut,
  Menu,
  PartyPopper,
  Plus,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sidebarItems = [
  {
    id: 1,
    name: "Dashboard",
    icon: <CalendarHeart />,
    href: "/dashboard",
  },
  {
    id: 2,
    name: "Add Event",
    icon: <Plus />,
    href: "/dashboard/add-event",
  },
  {
    id: 3,
    name: "All Events",
    icon: <PartyPopper />,
    href: "/dashboard/all-events",
  },
  {
    id: 4,
    name: "Preferences",
    icon: <Settings2 />,
    href: "/dashboard/preferences",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      <div className="fixed left-0 top-0 hidden h-screen w-72 flex-col justify-between border-r pb-4 pt-10 lg:flex">
        <div>
          <Link
            href={"/"}
            className="mb-5 inline-block w-full bg-gradient-to-br from-lime-400 to-lime-600 bg-clip-text px-4 text-center text-4xl font-black text-transparent"
          >
            Wishly
          </Link>
          <div className="flex w-full items-center justify-center"></div>
          {sidebarItems.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className={`flex cursor-pointer items-center gap-3 p-4 text-sm font-medium hover:bg-secondary/30 ${
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
      <MobileSidebar />
    </>
  );
}

function SignOut() {
  return (
    <SignOutButton>
      <Button
        className="flex w-full items-center justify-start gap-2 rounded-none p-4 text-muted-foreground hover:bg-secondary/40"
        variant={"ghost"}
        size={"custom"}
      >
        <LogOut />
        Sign Out
      </Button>
    </SignOutButton>
  );
}

function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="fixed top-0 flex h-[4.5rem] w-full items-center justify-start bg-background px-6">
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
        </div>
        <SheetContent
          side={"left"}
          className="flex h-full flex-col justify-between gap-4 p-0 pb-2 pt-12"
        >
          <div>
            <Link
              href={"/"}
              onClick={() => setOpen(false)}
              className="mb-5 inline-block w-full bg-gradient-to-br from-lime-400 to-lime-600 bg-clip-text px-4 text-center text-4xl font-black text-transparent"
            >
              Wishly
            </Link>
            <div className="flex w-full items-center justify-center"></div>
            {sidebarItems.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                onClick={() => setOpen(false)}
                className={`flex cursor-pointer items-center gap-3 p-4 text-sm font-medium hover:bg-secondary/30 ${
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
