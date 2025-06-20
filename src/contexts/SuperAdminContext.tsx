
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SuperAdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const SuperAdminContext = createContext<SuperAdminContextType | undefined>(undefined);

export const SuperAdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if super admin is logged in from sessionStorage
    const adminSession = sessionStorage.getItem('super_admin_authenticated');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);

    // Clear session when tab is closed
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('super_admin_authenticated');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Call edge function to verify super admin credentials
      const response = await fetch(`https://gemhywggtdryovqmalqh.supabase.co/functions/v1/super-admin-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      
      if (result.authenticated) {
        setIsAuthenticated(true);
        sessionStorage.setItem('super_admin_authenticated', 'true');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Super admin login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('super_admin_authenticated');
  };

  return (
    <SuperAdminContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </SuperAdminContext.Provider>
  );
};

export const useSuperAdmin = () => {
  const context = useContext(SuperAdminContext);
  if (context === undefined) {
    throw new Error('useSuperAdmin must be used within a SuperAdminProvider');
  }
  return context;
};
