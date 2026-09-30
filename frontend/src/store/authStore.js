import { create } from 'zustand';

const getInitialAuth = () => {
  try {
    const token = localStorage.getItem('noteful_token');
    const userStr = localStorage.getItem('noteful_user');
    const user = userStr ? JSON.parse(userStr) : null;
    return {
      token: token || null,
      user: user || null,
      isAuthenticated: Boolean(token && user),
    };
  } catch {
    return { token: null, user: null, isAuthenticated: false };
  }
};

export const useAuthStore = create((set) => ({
  ...getInitialAuth(),

  setAuth: (token, user) => {
    localStorage.setItem('noteful_token', token);
    localStorage.setItem('noteful_user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('noteful_token');
    localStorage.removeItem('noteful_user');
    set({ token: null, user: null, isAuthenticated: false });
  },

  updateUser: (updatedUser) => {
    localStorage.setItem('noteful_user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
}));
