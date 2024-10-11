"use client"
import { useBreadcrumbStore } from "@/store/useBreadcrumbStore";
import { useEffect } from "react";

export default function GroupPage() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Dashboard",
        href: "/dashboard",
      },
      {
        label: "Groups",
      },
    ]);
  }, []);

  return <>Group</>;
}
