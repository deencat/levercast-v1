"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Moon, Sun } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`flex h-screen w-full ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <header className="flex justify-end items-center p-4 border-b border-gray-800">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === "dark" ? "text-yellow-400 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-200"}`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 