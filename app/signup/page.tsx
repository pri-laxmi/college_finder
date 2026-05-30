"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      alert("Account created successfully!");

      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
  <main className="min-h-screen flex items-center justify-center bg-black p-4">
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl p-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center text-white mb-2">
        Create Account
      </h1>

      <p className="text-center text-zinc-400 mb-6">
        Sign up to save and compare colleges
      </p>

      <form
        onSubmit={handleSignup}
        className="space-y-4"
      > 
        <input
  type="text"
  placeholder="Full Name"
  className="w-full bg-zinc-800 border border-zinc-600 text-white rounded-lg p-3 placeholder-zinc-400 focus:outline-none focus:border-blue-500"
  value={name}
  onChange={(e) =>
    setName(e.target.value)
  }
/>
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-zinc-800 border border-zinc-600 text-white rounded-lg p-3 placeholder-zinc-400 focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-zinc-800 border border-zinc-600 text-white rounded-lg p-3 placeholder-zinc-400 focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full bg-zinc-800 border border-zinc-600 text-white rounded-lg p-3 placeholder-zinc-400 focus:outline-none focus:border-blue-500"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 transition"
        >
          {loading
            ? "Creating Account..."
            : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-zinc-400 text-sm mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-400 hover:text-blue-300"
        >
          Login
        </Link>
      </p>
    </div>
  </main>
);
 
}