"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  let accessToken: string = "";

  try {
    if (typeof window !== "undefined") {
      accessToken = sessionStorage.getItem("accessToken") as string;
    }
  } catch (error) {
    console.error(error);
  }

  if (accessToken) {
    window.location.href = "/feed";
  }

  useEffect(() => {
    const savedTheme = sessionStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    sessionStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.cookie = `isDarkMode=${isDarkMode}`;
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const backgroundColor = isDarkMode ? "#000" : "#fff";
  const textColor = isDarkMode ? "#fff" : "#000";

  if (!accessToken) {
    return (
      <div
        className={`flex items-center justify-center h-screen ${
          isDarkMode ? "dark" : ""
        }`}
        style={{ backgroundColor }}
      >
        <div className="space-x-4">
          <Button asChild>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/sign-in"
            >
              Sign In
            </Link>
          </Button>

          <Button asChild>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/login"
            >
              Login
            </Link>
          </Button>
        </div>

        <div className="fixed bottom-4 right-4">
          <Switch onClick={toggleMode} />
          <label className="ml-2" style={{ color: textColor }}>
            Dark Mode
          </label>
        </div>
      </div>
    );
  }
}
