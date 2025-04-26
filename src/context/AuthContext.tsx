"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface UserData {
  nickname?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
  // …any other fields you care about
}

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",      // ensure cookies are sent
        });
        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        const data = await response.json();
        // Some setups return { user: {…} }, others return the profile at the top level.
        const profile = (data.user as any) ?? (data as any);

        if (profile && profile.sub) {
          // Map only the fields your UI needs
          setUser({
            nickname: profile.nickname,
            given_name: profile.given_name,
            family_name: profile.family_name,
            email: profile.email,
            picture: profile.picture,
          });
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          console.warn("No user data in /api/auth/me response");
        }
      } catch (error) {
        console.warn("Error fetching /api/auth/me:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for easy consumption
export const useAuth = () => useContext(AuthContext);
