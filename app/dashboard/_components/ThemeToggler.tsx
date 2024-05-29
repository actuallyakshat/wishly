"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggler() {
  const { setTheme, theme } = useTheme();
  const [themeStatus, setThemeStatus] = React.useState<"Light" | "Dark">(
    theme === "dark" ? "Dark" : "Light"
  );
  React.useEffect(() => {
    setThemeStatus(theme === "dark" ? "Dark" : "Light");
  }, [theme]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <h1 className="w-full p-4 rounded-none flex items-center justify-start transition-colors cursor-pointer gap-3 hover:bg-secondary/40 text-muted-foreground hover:text-foreground text-sm">
          <Sun className="rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          {themeStatus}
        </h1>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
