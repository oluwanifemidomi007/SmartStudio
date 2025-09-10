import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type AuthUser = {
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user';
  profilePic?: string; // data URL or remote URL
};

type ToastState = {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
};

type AuthContextType = {
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
  updateProfilePic: (dataUrl: string) => void;
  updateProfile: (updates: Partial<AuthUser>) => void;
  toast: ToastState;
  triggerToast: (message: string, type?: 'success' | 'error') => void;
};

const STORAGE_KEY = 'smartstudio-auth-user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'success', visible: false });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      signIn: (u: AuthUser) => setUser(u),
      signOut: () => setUser(null),
      updateProfilePic: (dataUrl: string) =>
        setUser(prev => (prev ? { ...prev, profilePic: dataUrl } : prev)),
      updateProfile: (updates: Partial<AuthUser>) =>
        setUser(prev => (prev ? { ...prev, ...updates } : prev)),
      toast,
      triggerToast,
    }),
    [user, toast]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
