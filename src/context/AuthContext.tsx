import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type User } from "../types";
import { loginAPI, registerAPI } from "../api/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ✅ If corrupted data, clear it
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await loginAPI({ email, password });

    // ✅ Clear everything first before setting new user
    localStorage.removeItem("user");
    setUser(null);

    // ✅ Then set new user
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await registerAPI({ name, email, password });

    // ✅ Clear first
    localStorage.removeItem("user");
    setUser(null);

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    // ✅ Clear everything on logout
    setUser(null);
    localStorage.removeItem("user");
    // Clear any other cached data
    localStorage.removeItem("onboarding_seen");
    // Clear session storage to prevent data leakage between users
    sessionStorage.clear();
  };

  const updateUser = (updated: User) => {
    // ✅ Only update if same user — prevent cross-user pollution
    const stored = localStorage.getItem("user");
    if (stored) {
      const current = JSON.parse(stored);
      if (current._id !== updated._id) {
        console.warn("updateUser called with different user ID — ignoring");
        return;
      }
    }
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};