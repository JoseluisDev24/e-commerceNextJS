"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  userId: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) return null;

      const fetchedUser = await getUserFromCookie();
      return fetchedUser;
    } catch {
      return null;
    }
  };

  const logout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  const getUserFromCookie = async (): Promise<User | null> => {
    const res = await fetch("/api/me");
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      setIsAuthenticated(true);
      return data.user;
    }

    setUser(null);
    setIsAuthenticated(false);
    return null;
  };

  useEffect(() => {
    getUserFromCookie();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
