"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="cursor-pointer"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] hidden dark:inline-block" />
      <Moon className="h-[1.2rem] w-[1.2rem] dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}
