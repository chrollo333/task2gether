"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import BoardContent from "@/components/BoardContent";


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
      <BoardContent />
  </div>
  </div>
);
}
