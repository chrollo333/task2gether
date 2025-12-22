"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/"); // redirects you to landing page if not authenticated to access dashboard
      }
    });
    return () => unsubscribe(); //cleanup the listener on unmounting
  }, [router]);

return (
  <div className="flex h-screen">  
    <Sidebar />
     <div className="flex flex-1 flex-col">
      <Topbar />
    <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">  
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-zinc-800 mb-4">
          Welcome to your Dashboard!
        </h1>
        <p className="text-xl text-zinc-600">
          Start by creating your first project.
        </p>
      </div>
    </main>
  </div>
  </div>
);
}
