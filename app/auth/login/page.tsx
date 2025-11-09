"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../lib/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left Section - Form */}
      <div className="flex flex-col justify-center items-center px-8 md:px-16 bg-white">
        {/* Logo */}
       <div className="absolute top-10 sm:left-24 lg:left-60" >
        <img src="/assets/images/Logo.svg" className="w-auto h-auto" alt="Login" />
       </div>

        {/* Form Container */}
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500">Welcome back! Please enter your details</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
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

            {/* Remember + Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="rounded border-gray-300 focus:ring-lime-400"
                />
                <span>Remember for 30 Days</span>
              </label>
              <a href="/auth/forgot-password" className="text-gray-700 hover:underline">
                Forgot password
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-lime-400 hover:bg-lime-500 text-black font-semibold py-3 rounded-lg transition-all"
            >
              Sign in
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/auth/signup" className="relative inline-block text-black font-medium hover:underline">
              <span className="block">Sign up for free</span>
              <img
                src="/assets/images/signin_vector.svg"
                alt="Underline vector"
                className="absolute left-1/2 -translate-x-1/2 top-full mt-1"
              />
            </a>
          </p>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:flex items-center justify-center bg-white">
        <img
          src="/assets/images/signup_illustration.png"
          alt="Login Illustration"
          className="max-w-xs md:max-w-full lg:max-w-full"
        />
      </div>
    </div>
  );
}
