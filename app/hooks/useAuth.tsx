// useAuth.ts
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';

interface AuthState {
  isAuthenticated: boolean;
  userToken: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userToken: null,
  });

  const { triggerBooksFetch } = useContext(AuthContext);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    setAuthState({ isAuthenticated: !!userToken, userToken });

    const handleUnauthorized = (event: any) => {
      if (event.status === 401) {
        localStorage.removeItem('userToken');
        setAuthState({ isAuthenticated: false, userToken: null });
      }
    };

    window.addEventListener('unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, []);

  const login = (userToken: string) => {
    setAuthState((prevState) => ({
      ...prevState,
      isAuthenticated: true,
      userToken,
    }));
    localStorage.setItem('userToken', userToken);
    triggerBooksFetch(); // Trigger books fetch after login
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setAuthState({ isAuthenticated: false, userToken: null });
    triggerBooksFetch(); // Trigger books fetch after logout
  };

  return { authState, login, logout };
};