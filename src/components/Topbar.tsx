"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";


export default function Topbar() {
    const router = useRouter();

    const handleSignOutClick = async () => {
        signOut(auth).then(() => router.push("/"));
    };
        


  return (
<header className="h-16 bg-zinc-50   flex items-center justify-end px-6">
  <button onClick={handleSignOutClick} className="w-24 bg-zinc-800 text-white p-2 rounded hover:bg-zinc-900">
    Sign Out
  </button>
</header>
  );
}
