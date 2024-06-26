"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";

export interface AuthStateInterface {
  isAuthenticated: boolean;
  userToken: string | null;
  userName: string | null;
}
interface AuthContextValue {
  authState: AuthStateInterface;
  login: () => void;
  logout: () => void;
  triggerBooksFetch: number,
  updateTriggerBooksFetch: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  authState: { isAuthenticated: false, userToken: null, userName: null },
  triggerBooksFetch: 0,
  updateTriggerBooksFetch: () => {},
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthStateInterface>({
    isAuthenticated: false,
    userToken: null,
    userName: null,
  });
  const [triggerBooksFetch, setTriggerBooksFetch] = useState(0);

  const updateTriggerBooksFetch = () => {
    setTriggerBooksFetch((prevTrigger) => prevTrigger + 1);
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const userName = localStorage.getItem("userName");
    setAuthState({ isAuthenticated: !!userToken, userToken, userName });
  }, []);

  const login = () => {
    const userToken = localStorage.getItem("userToken");
    const userName = localStorage.getItem("userName");
    setAuthState((prevState) => ({
      ...prevState,
      isAuthenticated: true,
      userToken,
      userName,
    }));
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setAuthState({ isAuthenticated: false, userToken: null, userName: null });
  };

  return (
    <AuthContext.Provider
      value={{ authState, login, logout ,triggerBooksFetch,updateTriggerBooksFetch}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
