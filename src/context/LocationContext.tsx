"use client";

import { createContext, useContext, useEffect, useState } from "react";

type LocationContextType = {
  locationId: number;
  setLocationId: (id: number) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [locationId, setLocationIdState] = useState<number>(1); // Default to Leeds

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      setLocationIdState(Number(storedLocation));
    }
  }, []);

  const setLocationId = (id: number) => {
    setLocationIdState(id);
    localStorage.setItem("userLocation", id.toString());
  };

  return (
    <LocationContext.Provider value={{ locationId, setLocationId }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
