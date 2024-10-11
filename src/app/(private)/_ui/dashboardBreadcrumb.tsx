"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbStore } from "@/store/useBreadcrumbStore";
import Link from "next/link";
import React from "react";

export function DashboardBreadcrumb() {
  const { breadcrumbs } = useBreadcrumbStore();
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <React.Fragment key={`breadcrumb-${index}`}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  {breadcrumb?.href ? (
                    <Link className="hover:underline hover:underline-offset-4" href={breadcrumb.href}>{breadcrumb.label}</Link>
                  ) : (
                    <>{breadcrumb.label}</>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
