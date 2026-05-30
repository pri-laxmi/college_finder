"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  async function login() {
    const res = await fetch(
      "/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (data.token) {
      localStorage.setItem(
        "token",
        data.token
      );

      alert("Login successful");
    } else {
      alert(data.error);
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <div className="flex flex-col gap-4 max-w-md">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={login}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login
        </button>
        <p className="text-center text-sm mt-4">
  Don't have an account?{" "}
  <a
    href="/signup"
    className="text-blue-600 hover:underline"
  >
    Sign up
  </a>
</p>

<p className="text-center text-sm mt-2">
  <a
    href="/"
    className="text-gray-600 hover:underline"
  >
    ← Back to Home
  </a>
</p>
      </div>
    </main>
  );
}