"use client";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const session = useSession();
  console.log("🚀 ~ DashboardPage ~ session:", session);

  return (
    <div className="p-10 ">
      <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
      <p>You are logged in as {session?.data?.user?.name}</p>
    </div>
  );
}
