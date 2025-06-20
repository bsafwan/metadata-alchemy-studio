
import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifySession } from '@/utils/auth';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  business_name: string;
  business_category: string;
  is_verified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const userData = await verifySession();
      setUser(userData);
    } catch (error) {
      console.error('Failed to verify session:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logoutUser = async () => {
    const { logout: logoutUtil } = await import('@/utils/auth');
    await logoutUtil();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout: logoutUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
