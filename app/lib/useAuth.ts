"use client";

import { useEffect, useState } from "react";
import { account } from "./appwrite";

export type User = {
  name: string;
  email: string;
  $id: string;
};

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  return { user, loading, login, signup, logout };
}
