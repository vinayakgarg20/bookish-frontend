"use client";
import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextValue {
  triggerBooksFetch: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  triggerBooksFetch: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [, setTrigger] = useState(false);

  const triggerBooksFetch = () => {
    setTrigger((prevTrigger) => !prevTrigger);
  };

  return (
    <AuthContext.Provider value={{ triggerBooksFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };