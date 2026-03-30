'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setToken(parsed.token);
        setUser(parsed);
      } catch {
        localStorage.removeItem('user');
      }
    }

    setMounted(true);
  }, []);

  const login = (token: string, user: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    setToken(token);
    setUser(user);

    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setToken(null);
    setUser(null);

    router.push('/login');
  };

  // Don't render children until client-side hydration is complete.
  // This prevents any mismatch between server HTML and client state.
  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ token, user, isLoading: !mounted, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
