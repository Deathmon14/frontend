import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { SparkleEffect } from '../animations/LottieWrapper';

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Loading KAISRI...",
  showLogo = true 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="text-center relative z-10">
        {showLogo && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              duration: 0.8 
            }}
            className="flex items-center justify-center space-x-3 mb-8"
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-xl"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.4)",
                  "0 0 40px rgba(168, 85, 247, 0.8)",
                  "0 0 20px rgba(168, 85, 247, 0.4)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <Calendar className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl font-bold text-gradient"
            >
              KAISRI
            </motion.h1>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-2">
            {message}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Preparing your perfect event experience
          </p>
        </motion.div>

        {/* Modern loading animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="flex items-center justify-center space-x-2 mb-8"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="w-64 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full mx-auto overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Sparkle effects */}
        <SparkleEffect className="absolute inset-0 pointer-events-none" count={8} />
      </div>
    </div>
  );
};

// Minimal loading spinner for smaller components
export const LoadingSpinner: React.FC<{ 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-primary-200 border-t-primary-600 rounded-full ${className || ''}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Skeleton loader for content
export const SkeletonLoader: React.FC<{ 
  lines?: number;
  className?: string;
}> = ({ lines = 3, className }) => {
  return (
    <div className={`space-y-3 ${className || ''}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 rounded-lg"
          style={{ width: `${80 + Math.random() * 20}%` }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};