import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import './index.css';
import { initializeTheme } from './lib/theme';

// Initialize theme system
initializeTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Enhanced Toaster with modern styling */}
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          color: '#1f2937',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
          style: {
            background: 'rgba(16, 185, 129, 0.1)',
            backdropFilter: 'blur(10px)',
            color: '#065f46',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
          style: {
            background: 'rgba(239, 68, 68, 0.1)',
            backdropFilter: 'blur(10px)',
            color: '#991b1b',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          },
        },
      }}
    />
    <App />
  </StrictMode>
);