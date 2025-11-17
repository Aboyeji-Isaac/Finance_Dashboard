"use client";

import { useEffect, useState } from "react";
import { account } from "./appwrite";
import { useRouter } from "next/navigation";

export type User = {
  name: string;
  email: string;
  $id: string;
};

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Get current session
  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await account.get();
        setUser(session);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getSession();
  }, []);

  const login = async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password);
    const session = await account.get();
    setUser(session);
  };

  const signup = async (email: string, password: string, name: string) => {
    await account.create("unique()", email, password, name);
    await login(email, password);
  };

  // 🔥 Full logout + redirect
  const logout = async () => {
    try {
      await account.deleteSession("current"); // Remove session from Appwrite
      setUser(null);                           // Clear user locally
      router.push("/auth/login");              // Redirect
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return { user, loading, login, signup, logout };
}
//NOTE: The logout button still need some more security features