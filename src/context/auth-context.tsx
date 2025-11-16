"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage on initial load
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in a real app, this would be an API call
    if (email === "admin@example.com" && password === "password123") {
      const mockUser: User = {
        id: "1",
        name: "Admin User",
        email: email,
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      const cookieOptions = {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        sameSite: "strict",
        secure: true,
      };
      document.cookie = `isAuthenticated=true;${cookieOptions.expires.toUTCString()};${
        cookieOptions.sameSite
      };${cookieOptions.secure ? "secure" : ""}`;
      localStorage.setItem("mockUser", JSON.stringify(mockUser));
      return true;
    }

    // Check if user exists in localStorage (for users who registered)
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("mockUsers");
      if (storedUsers) {
        const users: User[] = JSON.parse(storedUsers);
        const foundUser = users.find((user) => user.email === email);
        if (foundUser && password === "password123") {
          // Simplified for demo
          setUser(foundUser);
          setIsAuthenticated(true);
          localStorage.setItem("mockUser", JSON.stringify(foundUser));
          return true;
        }
      }
    }

    return false;
  };

  const signUp = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Mock registration - in a real app, this would be an API call
    if (password.length < 6) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(), // Simple ID generation
      name: name,
      email: email,
    };

    // Store user in localStorage
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("mockUsers");
      let users: User[] = [];

      if (storedUsers) {
        try {
          users = JSON.parse(storedUsers);
        } catch (error) {
          console.error("Error parsing users from localStorage", error);
        }
      }

      // Check if user already exists
      if (users.some((u) => u.email === email)) {
        return false; // User already exists
      }

      users.push(newUser);
      localStorage.setItem("mockUsers", JSON.stringify(users));
    }

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("mockUser", JSON.stringify(newUser));
    return true;
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    document.cookie =
      "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; sameSite=strict; secure";
    localStorage.removeItem("mockUser");
  };

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
