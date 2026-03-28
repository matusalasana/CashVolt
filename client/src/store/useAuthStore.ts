import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        localStorage.setItem('auth_token', token); // For our Axios interceptor
        set({ user, token });
      },
      logout: () => {
        localStorage.removeItem('auth_token');
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage', // Key in localStorage
    }
  )
);
