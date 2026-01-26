// src/hooks/useAuth.ts
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  const login = (email: string, password: string) => {
    // Mock login
    if (email && password) {
      setUser(email);
      router.push("/"); // redireciona para dashboard
    }
  };

  const register = (name: string, email: string, password: string) => {
    // Mock register
    if (name && email && password) {
      setUser(email);
      router.push("/"); // redireciona para dashboard
    }
  };

  const logout = () => {
    setUser(null);
    router.push("/login");
  };

  return { user, login, register, logout };
};
