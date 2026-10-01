import { create } from 'zustand';
import { api } from '../lib/api';

const getInitialAuth = () => {
  try {
    const token = localStorage.getItem('noteful_token');
    const userStr = localStorage.getItem('noteful_user');
    const user = userStr ? JSON.parse(userStr) : null;
    return {
      token: token || null,
      user: user || null,
      isAuthenticated: Boolean(token && user),
      isLoading: true,
    };
  } catch {
    return { token: null, user: null, isAuthenticated: false, isLoading: true };
  }
};

export const useAuthStore = create((set) => ({
  ...getInitialAuth(),

  setAuth: (token, user) => {
    localStorage.setItem('noteful_token', token);
    localStorage.setItem('noteful_user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem('noteful_token');
    localStorage.removeItem('noteful_user');
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },

  updateUser: (updatedUser) => {
    localStorage.setItem('noteful_user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  checkAuth: async () => {
    const delay = new Promise((resolve) => setTimeout(resolve, 600));
    const token = localStorage.getItem('noteful_token');

    if (!token) {
      await delay;
      set({ token: null, user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      const [response] = await Promise.all([
        api.get('/auth/me'),
        delay,
      ]);
      const data = response.data;
      if (data?.token) {
        localStorage.setItem('noteful_token', data.token);
        set({ token: data.token });
      }
      localStorage.setItem('noteful_user', JSON.stringify(data));
      set({ user: data, isAuthenticated: true, isLoading: false });
    } catch {
      await delay;
      localStorage.removeItem('noteful_token');
      localStorage.removeItem('noteful_user');
      set({ token: null, user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
