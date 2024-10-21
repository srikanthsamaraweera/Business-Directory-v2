'use client'
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';



export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result.ok) {
      router.push('/dashboard'); // Redirect to the dashboard or a protected page
    } else {
      alert('Login failed');
    }
  };



  return (
    <NextUIProvider>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>main page</h1>
      </main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </NextUIProvider>
  );
}
