'use client';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-100 flex flex-col items-center justify-center px-6">
       <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-zinc-800 mb-4">
          Task2Gether
        </h1>
       </div>
       <p className="text-xl text-zinc-600 mb-6">
        Real-time collaborative task boards.<br />
        Organize, share, and get tasks done together.
       </p>

       <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 mb-12 flex items-center justify-center text-zinc-400">
        [image coming soon hehe]
       </div>

       <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
            href="/register"
            className="px-8 py-4 bg-zinc-800 text-white rounded-lg text-lg font-medium hover:bg-zinc-900 transition"
          >
            Get Started Free
          </a>
          <a
            href="/login"
            className="px-8 py-4 bg-white text-zinc-800 border border-zinc-300 rounded-lg text-lg font-medium hover:bg-zinc-50 transition"
          >
            Log In
          </a>
        </div>
    </div>
  )
}