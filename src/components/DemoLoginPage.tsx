// Demo Login Page with modern design
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Briefcase, ArrowRight, Eye, EyeOff, Mail, Lock, User as UserIcon, Sparkles } from 'lucide-react';
import { User } from '../types';
import { Hero3D } from './3D/HeroScene';
import { SparkleEffect, PartyPopper } from './animations/LottieWrapper';
import { ThemeToggle } from './ThemeToggle';
import { fadeInUp, slideInLeft, slideInRight } from '../lib/utils';

interface DemoLoginPageProps {
  onLogin: (user: User) => void;
}

export const DemoLoginPage: React.FC<DemoLoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: 'demo@example.com',
    password: 'demo123',
    role: 'client' as 'client' | 'vendor'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      const demoUser: User = {
        uid: 'demo-user-123',
        name: isLogin ? 'Demo User' : (formData.name || 'New User'),
        email: formData.email,
        role: formData.role,
        status: 'active'
      };
      onLogin(demoUser);
      setLoading(false);
    }, 1500);
  };

  const roleInfo = {
    client: {
      title: 'Client Account',
      description: 'Browse and book event packages',
      icon: <Users className="w-6 h-6" />,
      color: 'from-primary-600 to-secondary-600'
    },
    vendor: {
      title: 'Vendor Account', 
      description: 'Manage event services and tasks',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-emerald-600 to-teal-600'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - 3D Hero */}
        <motion.div
          {...slideInLeft}
          className="hidden lg:flex lg:w-1/2 items-center justify-center p-12"
        >
          <div className="w-full h-full max-w-2xl max-h-2xl relative">
            <Hero3D className="w-full h-full" />
            
            {/* Floating Text Elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute top-1/4 left-12 card-glass p-6 rounded-2xl"
            >
              <h3 className="text-lg font-bold text-gradient mb-2">Premium Events</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                Curated experiences for unforgettable moments
              </p>
              <PartyPopper className="mt-2" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute bottom-1/4 right-12 card-glass p-6 rounded-2xl"
            >
              <h3 className="text-lg font-bold text-gradient mb-2">Expert Vendors</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                Professional services from trusted partners
              </p>
              <Sparkles className="w-6 h-6 text-yellow-500 mt-2" />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          {...slideInRight}
          className="w-full lg:w-1/2 flex items-center justify-center p-6"
        >
          <div className="w-full max-w-md">
            {/* Header */}
            <motion.div {...fadeInUp} className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <Calendar className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-5xl font-bold text-gradient">KAISRI</h1>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Book it. Forget it. Flaunt it.
                  </p>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                  {isLogin ? 'Welcome back!' : 'Join KAISRI'}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {isLogin ? 'Sign in to continue your event journey' : 'Create your account to get started'}
                </p>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="card-glass p-8 rounded-3xl border border-white/20 dark:border-white/10 relative overflow-hidden"
            >
              {/* Sparkle Effects */}
              <SparkleEffect className="absolute inset-0 pointer-events-none" count={3} />

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="input-modern pl-12"
                        placeholder="Enter your full name"
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="input-modern pl-12"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="input-modern pl-12 pr-12"
                      placeholder="Enter your password"
                      required
                      minLength={6}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </motion.button>
                  </div>
                  {!isLogin && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Password must be at least 6 characters
                    </p>
                  )}
                </div>

                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                      Account Type *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(roleInfo).map(([role, info]) => (
                        <motion.label
                          key={role}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative cursor-pointer border-2 rounded-2xl p-4 transition-all ${
                            formData.role === role
                              ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role}
                            checked={formData.role === role}
                            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'client' | 'vendor' }))}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mx-auto mb-3 text-white shadow-lg`}>
                              {info.icon}
                            </div>
                            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                              {info.title}
                            </h4>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                              {info.description}
                            </p>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full h-12 text-lg font-semibold"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </motion.button>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-6 text-center"
              >
                <p className="text-neutral-600 dark:text-neutral-400">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </motion.button>
                </p>
              </motion.div>

              {/* Demo Notice */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-4 p-3 glass rounded-xl border border-yellow-500/20"
              >
                <p className="text-xs text-center text-yellow-700 dark:text-yellow-300">
                  🚀 <strong>Demo Mode:</strong> Use any credentials to explore the modern interface
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};