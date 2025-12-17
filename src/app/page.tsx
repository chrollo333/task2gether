'use client';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('User:', user);
    });
  }, []);

  return <div>Firebase connected – check console!</div>;
}