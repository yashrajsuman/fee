'use client'; // Add this line to mark this file as a client component

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
const url=process.env.NEXT_PUBLIC_BACKEND_URL;

export function DashboardHeader() {
  const [name, setName] = useState(""); // State to store the name
  const id = localStorage.getItem("id");

  // Extract the USN from the ID
  const usn = id ? id.substring(0, 10) : "";

  useEffect(() => {
    if (usn) {
      // Fetch the name from the backend using the USN
      fetch(`${url}/api/getNameByUsn/${usn}`)
        .then((response) => response.json())
        .then((data) => {
          // Set the name state
          setName(data.name);
        })
        .catch((err) => {
          console.error("Error fetching name:", err);
        });
    }
  }, [usn]); // Fetch name when the USN changes or component mounts

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <h2 className="text-lg font-semibold">
          Welcome, {name || "Loading..."} {/* Show "Loading..." until name is fetched */}
        </h2>
        <Button size="icon" variant="ghost">
          <BellIcon className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  );
}
