
import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "../types";
import { currentUser as mockCurrentUser } from "../mockData";
import { toast } from "sonner";

interface UserContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (username: string, email: string, password: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data from local storage or API
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        } else {
          // For demo purposes, use the mock current user
          setCurrentUser(mockCurrentUser);
          localStorage.setItem("currentUser", JSON.stringify(mockCurrentUser));
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (email: string, password: string) => {
    // Simulated login functionality
    setIsLoading(true);
    setTimeout(() => {
      // In a real app, validate credentials against backend
      if (email && password) {
        setCurrentUser(mockCurrentUser);
        localStorage.setItem("currentUser", JSON.stringify(mockCurrentUser));
        toast.success("Successfully logged in!");
      } else {
        toast.error("Invalid email or password");
      }
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast.info("You have been logged out");
  };

  const register = (username: string, email: string, password: string) => {
    // Simulated registration functionality
    setIsLoading(true);
    setTimeout(() => {
      if (username && email && password) {
        const newUser: User = {
          id: `user${Date.now()}`,
          username,
          email,
          avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`,
        };
        setCurrentUser(newUser);
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        toast.success("Account created successfully!");
      } else {
        toast.error("Please fill all required fields");
      }
      setIsLoading(false);
    }, 1000);
  };

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    register,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
