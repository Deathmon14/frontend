// Theme management utilities
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },
      toggleTheme: () => {
        const current = get().resolvedTheme;
        const newTheme = current === 'light' ? 'dark' : 'light';
        set({ theme: newTheme, resolvedTheme: newTheme });
        applyTheme(newTheme);
      },
    }),
    {
      name: 'kaisri-theme',
      onRehydrate: (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    }
  )
);

function applyTheme(theme: 'light' | 'dark' | 'system') {
  const root = window.document.documentElement;
  
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.classList.toggle('dark', systemTheme === 'dark');
    useTheme.setState({ resolvedTheme: systemTheme });
  } else {
    root.classList.toggle('dark', theme === 'dark');
    useTheme.setState({ resolvedTheme: theme });
  }
}

// Initialize theme on app start
export function initializeTheme() {
  const { theme } = useTheme.getState();
  applyTheme(theme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const { theme } = useTheme.getState();
    if (theme === 'system') {
      const systemTheme = e.matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
      useTheme.setState({ resolvedTheme: systemTheme });
    }
  });
}