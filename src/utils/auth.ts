
import { supabase } from '@/integrations/supabase/client';

// Simple password hashing using Web Crypto API
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Generate session token
export const generateSessionToken = (): string => {
  return crypto.randomUUID() + '-' + Date.now();
};

// Create user session
export const createUserSession = async (userId: string): Promise<string> => {
  const sessionToken = generateSessionToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

  const { error } = await supabase
    .from('user_sessions')
    .insert({
      user_id: userId,
      session_token: sessionToken,
      expires_at: expiresAt.toISOString()
    });

  if (error) throw error;
  
  // Store session in localStorage
  localStorage.setItem('session_token', sessionToken);
  localStorage.setItem('user_id', userId);
  
  return sessionToken;
};

// Verify session
export const verifySession = async (): Promise<any> => {
  const sessionToken = localStorage.getItem('session_token');
  if (!sessionToken) return null;

  const { data, error } = await supabase
    .from('user_sessions')
    .select(`
      *,
      users (*)
    `)
    .eq('session_token', sessionToken)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !data) {
    localStorage.removeItem('session_token');
    localStorage.removeItem('user_id');
    return null;
  }

  return data.users;
};

// Logout
export const logout = async (): Promise<void> => {
  const sessionToken = localStorage.getItem('session_token');
  if (sessionToken) {
    await supabase
      .from('user_sessions')
      .delete()
      .eq('session_token', sessionToken);
  }
  
  localStorage.removeItem('session_token');
  localStorage.removeItem('user_id');
};
