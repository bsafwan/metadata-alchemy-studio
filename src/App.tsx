
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Router from './Router';
import { AuthProvider } from './contexts/AuthContext';
import { SuperAdminProvider } from './contexts/SuperAdminContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationPrompt } from './components/NotificationPrompt';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SuperAdminProvider>
          <Router />
          <NotificationPrompt />
          <Toaster />
          <Sonner />
        </SuperAdminProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
