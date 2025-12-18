'use client';
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function GoogleSignInButton() {
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      alert("Google sign-in failed. Please try again.");
    }
  };

  return (
    <>
      <div className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-gray-100 px-2 text-zinc-500">or</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="mt-4 w-full flex items-center justify-center gap-3 bg-white text-zinc-700 py-2 rounded border border-zinc-300 hover:bg-zinc-50 transition"
      >
        <FcGoogle className="w-5 h-5" />
        Continue with Google
      </button>
    </>
  );
}