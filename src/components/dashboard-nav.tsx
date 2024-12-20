"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomeIcon, CreditCardIcon, GraduationCapIcon, LogOutIcon } from "lucide-react";
import Cookies from "js-cookie";

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Fee Payment",
      href: "/dashboard/fee-payment",
      icon: CreditCardIcon,
    },
    {
      title: "Results",
      href: "/dashboard/results",
      icon: GraduationCapIcon,
    },
  ];

  // Logout function to clear cookies
  const handleLogout = () => {
    // Delete the auth token or any other cookies
    Cookies.remove("authToken", { path: "/" }); // Adjust the cookie name and path as needed

    // Optionally, clear local storage or any other client-side storage
    localStorage.clear();

    // Redirect to the login page
    router.push("/");
  };

  return (
    <nav className="relative border-r bg-muted/40 w-[250px] hidden md:block">
      <ScrollArea className="h-[100vh] py-6">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <h2 className="mb-4 px-4 text-xl font-semibold tracking-tight">Navigation</h2>
              {links.map((link) => (
                <Button
                  key={link.href}
                  variant={pathname === link.href ? "secondary" : "ghost"}
                  className={cn("w-full justify-start")}
                  asChild
                >
                  <Link href={link.href}>
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-auto px-7">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </ScrollArea>
    </nav>
  );
}
