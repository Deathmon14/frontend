import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { cn } from '../lib/utils';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className, 
  showLabel = false 
}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'system', icon: Monitor, label: 'System' },
    { value: 'dark', icon: Moon, label: 'Dark' },
  ] as const;

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
        {themes.map(({ value, icon: Icon, label }) => (
          <motion.button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "relative p-2 rounded-lg transition-colors duration-200",
              "flex items-center justify-center",
              theme === value
                ? "text-primary-600 dark:text-primary-400"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === value && (
              <motion.div
                className="absolute inset-0 bg-white dark:bg-neutral-700 rounded-lg shadow-sm"
                layoutId="theme-indicator"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon className="w-4 h-4 relative z-10" />
            {showLabel && (
              <span className="ml-2 text-sm font-medium relative z-10">
                {label}
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Simple toggle version (just light/dark)
export const SimpleThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { toggleTheme, resolvedTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800",
        "text-neutral-600 dark:text-neutral-400",
        "hover:text-neutral-800 dark:hover:text-neutral-200",
        "transition-colors duration-200",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: resolvedTheme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
};