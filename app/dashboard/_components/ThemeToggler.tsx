"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggler() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {theme === "dark" ? (
          <h1 className="flex w-full cursor-pointer items-center justify-start gap-3 rounded-none p-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/40 hover:text-foreground">
            <Moon className="-rotate-90 scale-100 dark:rotate-0 dark:scale-100" />
            <p>Dark</p>
          </h1>
        ) : (
          <h1 className="flex w-full cursor-pointer items-center justify-start gap-3 rounded-none p-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/40 hover:text-foreground">
            <Sun className="rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
            <p>Light</p>
          </h1>
        )}
        {/* <div className="flex items-center gap-3">
          
        </div> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="font-medium"
        >
          Light Mode
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="font-medium"
        >
          Dark Mode
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
