import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import PrivateProvider from "./provider";
import { ReactNode } from "react";
import { DesktopNav } from "./_ui/desktop-nav";
import { MobileNav } from "./_ui/mobi-nav";
import { DashboardBreadcrumb } from "./_ui/dashboardBreadcrumb";
import { User } from "./_ui/user";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <PrivateProvider>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            <DashboardBreadcrumb />
            <div className="ml-auto">
              <User />
            </div>
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
      </main>
    </PrivateProvider>
  );
}
