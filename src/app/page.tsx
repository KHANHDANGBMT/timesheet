"use client";
import { signIn } from "next-auth/react";

export default function DashboardPage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-black">
          Time sheet application{" "}
        </h1>
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
