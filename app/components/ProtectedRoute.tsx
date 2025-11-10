"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "../lib/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) return <div className="text-center mt-10">Checking authentication...</div>;

  return <>{user && children}</>;
}
