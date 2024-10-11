"use client";
import Link from "next/link";
import { NavItem } from "./nav-item";
import { Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNav } from "../_logic/useNav";
import { useSession } from "next-auth/react";

export function DesktopNav() {
  const session = useSession();
  const { navList } = useNav({ isAdmin: session.data?.user.role === "admin" });

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          TS
          <span className="sr-only">Eric</span>
        </Link>

        {navList.map((nav, index) => {
          return (
            <NavItem
              href={nav.href}
              label={nav.label}
              key={`nav-desk-item-${index}`}
            >
              {nav.icon}
            </NavItem>
          );
        })}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
