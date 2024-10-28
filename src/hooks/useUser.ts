// src/hooks/useUser.ts
import { useState, useEffect } from 'react';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me'); // Adjust endpoint as needed
        if (response.ok) {
          // Attempt to parse JSON only if there's content
          const text = await response.text();
          const userData = text ? JSON.parse(text) : null;

          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            setUser(null);
            setIsAuthenticated(false);
            console.warn("No user data available.");
          }
        } else {
          console.warn("Failed to fetch user data:", response.statusText);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAuthenticated(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isAuthenticated };
};

export default useUser;
