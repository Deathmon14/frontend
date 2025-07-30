import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

interface LottieAnimationProps {
  animationData?: any;
  animationUrl?: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  delay?: number;
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  animationUrl,
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
  delay = 0
}) => {
  const [animation, setAnimation] = React.useState(null);

  React.useEffect(() => {
    if (animationUrl && !animationData) {
      fetch(animationUrl)
        .then(response => response.json())
        .then(data => setAnimation(data))
        .catch(error => console.error('Error loading Lottie animation:', error));
    }
  }, [animationUrl, animationData]);

  const lottieOptions = {
    animationData: animationData || animation,
    loop,
    autoplay,
    speed,
  };

  if (!animationData && !animation) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      <Lottie {...lottieOptions} />
    </motion.div>
  );
};

// Preset animations using CSS-based alternatives for common Lottie animations
export const LoadingDots: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex space-x-1 ${className || ''}`}>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-primary-600 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);

export const PulseLoader: React.FC<{ className?: string; size?: string }> = ({ 
  className, 
  size = 'w-8 h-8' 
}) => (
  <motion.div
    className={`${size} border-2 border-primary-600 border-t-transparent rounded-full ${className || ''}`}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

export const FloatingHeart: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div
    className={`text-red-500 ${className || ''}`}
    animate={{
      y: [0, -10, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    ❤️
  </motion.div>
);

export const SuccessCheckmark: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div
    className={`text-green-500 text-2xl ${className || ''}`}
    initial={{ scale: 0, rotate: 180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
  >
    ✅
  </motion.div>
);

// Event-specific animations
export const PartyPopper: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div
    className={`text-yellow-500 text-2xl ${className || ''}`}
    animate={{
      rotate: [0, 20, -20, 0],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 2,
    }}
  >
    🎉
  </motion.div>
);

export const MusicNote: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div
    className={`text-purple-500 text-xl ${className || ''}`}
    animate={{
      y: [0, -5, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    🎵
  </motion.div>
);

export const SparkleEffect: React.FC<{ className?: string; count?: number }> = ({ 
  className, 
  count = 5 
}) => (
  <div className={`relative ${className || ''}`}>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-yellow-400 text-lg"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          scale: [0, 1, 0],
          rotate: [0, 180, 360],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.4,
          ease: "easeInOut",
        }}
      >
        ✨
      </motion.div>
    ))}
  </div>
);