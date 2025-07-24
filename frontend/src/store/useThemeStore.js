import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('broChat-theme') || 'night',
  setTheme: (theme) => {
    localStorage.setItem('broChat-theme', theme);
    set({ theme });
  },
}));
