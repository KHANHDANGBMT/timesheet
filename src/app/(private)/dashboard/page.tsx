"use client";
import { useBreadcrumbStore } from "@/store/useBreadcrumbStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardPage() {
  const { setBreadcrumbs } = useBreadcrumbStore();
  const session = useSession();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Dashboard",
      },
    ]);
  }, []);

  return (
    <div className="p-10 ">
      <h1 className="text-2xl font-bold">Welcome {session?.data?.user?.name}</h1>
      <p>You are logged in as {session?.data?.user?.role}</p>
    </div>
  );
}
