"use client";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg border border-zinc-200 w-full max-w-md"
      >
        <h1 className="text-xl mb-2 text-zinc-500">Register and...</h1>
        <h1 className="text-2xl mb-6 text-zinc-700">
          Start COLLABorative tasks today.
        </h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          className="w-full p-2 mb-4 border border-gray-300 rounded placeholder-zinc-300 text-zinc-700 focus:ring-zinc-600 focus:ring-2"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
          className="w-full p-2 mb-4 border border-gray-300 rounded placeholder-zinc-300 text-zinc-700 focus:ring-zinc-600 focus:ring-2"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password..."
          className="w-full p-2 mb-4 border border-gray-300 rounded placeholder-zinc-300 text-zinc-700 focus:ring-zinc-600 focus:ring-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-zinc-800 text-white p-2 rounded hover:bg-zinc-900"
        >
          Register
        </button>
        <GoogleSignInButton />
        <p className="text-sm mt-4 text-zinc-600">
          Already have an account?
          <a
            href="/login"
            className="text-sm text-zinc-800 hover:underline ml-1"
          >
            Login here.
          </a>
        </p>
      </form>
    </div>
  );
}
