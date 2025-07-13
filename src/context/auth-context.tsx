
'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import axios from '@/lib/axios'; // We use the configured axios instance

// --- Mock API Calls ---
// In a real application, these would be actual API requests.

const fakeApiLogin = async (email: string, password: string): Promise<{ token: string; user: User }> => {
  console.log(`Attempting to log in with email: ${email}`);
  // Super simple mock logic
  if (email === 'admin@example.com' && password === 'password') {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    const mockToken = 'fake-jwt-token-' + Math.random().toString(36).substring(2);
    const mockUser: User = {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
    };
    return { token: mockToken, user: mockUser };
  } else {
    throw new Error('Invalid email or password');
  }
};

const fakeApiFetchUser = async (): Promise<User> => {
    // The axios interceptor should add the token. Here we just check if it exists.
    if (typeof window !== 'undefined' && localStorage.getItem('accessToken')) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        const mockUser: User = {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
        };
        return mockUser;
    } else {
        throw new Error("No token found");
    }
};

// --- Auth Context ---

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const fetchedUser = await fakeApiFetchUser();
          setUser(fetchedUser);
        } catch (error) {
          console.error('Failed to fetch user, logging out.', error);
          localStorage.removeItem('accessToken');
          setUser(null);
        }
      }
      setIsAuthLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user } = await fakeApiLogin(email, password);
    localStorage.setItem('accessToken', token);
    setUser(user);
    // No need to redirect here, the login page will do it
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    router.push('/login');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAuthLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
