"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../lib/useAuth";
import Image from "next/image";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left section - form */}
      <div className="flex flex-col justify-center items-center px-8 md:px-16 bg-white">
       <div className="absolute top-10 left-60" >
        <img src="/assets/images/Logo.svg" className="w-auto h-auto" alt="Login" />
       </div>
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New Account</h1>
          <p className="text-gray-500">Welcome! Please enter you details.</p>

          <form onSubmit={handleSignup} className="space-y-4">
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 hover:bg-lime-500 text-black font-semibold py-3 rounded-lg transition-all"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="relative inline-block text-black font-medium hover:underline">
              <span className="block">Sign in</span>
              <img
                src="/assets/images/signin_vector.svg"
                alt="Signin svg"
                className="absolute left-1/2 -translate-x-1/2 top-full mt-1"
              />
            </a>
          </p>
        </div>
      </div>

      {/* Right section - image */}
      <div className="hidden md:flex items-center justify-center bg-white">
        <img
          src="/assets/images/signup_illustration.png"
          alt="Signup Illustration"
          className="max-w-xs md:max-w-full lg:max-w-full"
        />
      </div>
    </div>
  );
}
