// src/App.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, Package, Settings, LogOut, Menu, X, Bell, ShieldCheck } from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, query, where, orderBy, onSnapshot, updateDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import LoginPage from './components/LoginPage';
import ClientDashboard from './components/ClientDashboard';
import VendorDashboard from './components/VendorDashboard';
import AdminDashboard from './components/AdminDashboard';
import { LoadingScreen } from './components/ui/Loading';
import { ThemeToggle } from './components/ThemeToggle';
import { User as UserType, Notification } from './types';
import { fadeInUp, fadeInDown } from './lib/utils';

function App() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Check if Firebase is available
    if (!auth) {
      // Demo mode - simulate a user login after 2 seconds
      const timer = setTimeout(() => {
        setCurrentUser({
          uid: 'demo-user-123',
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'client',
          status: 'active'
        });
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    // Real Firebase auth
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCurrentUser({
              uid: firebaseUser.uid,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              status: userData.status
            });
          } else {
            console.error('User document not found in Firestore');
            setCurrentUser(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );

      const unsubscribeNotifications = onSnapshot(q, (snapshot) => {
        const notificationsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Notification));
        setNotifications(notificationsData);
      }, (error) => {
        console.error("Error fetching real-time notifications:", error);
      });

      return () => unsubscribeNotifications();
    }
  }, [currentUser]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, { isRead: true });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setMobileMenuOpen(false);
      setIsNotificationsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserIcon = () => {
    switch (currentUser?.role) {
      case 'client':
        return <Package className="w-5 h-5" />;
      case 'vendor':
        return <Settings className="w-5 h-5" />;
      case 'admin':
        return <ShieldCheck className="w-5 h-5" />; // Updated icon for admin
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const renderDashboard = () => {
    if (!currentUser) return null;

    switch (currentUser.role) {
      case 'client':
        return <ClientDashboard user={currentUser} />;
      case 'vendor':
        return <VendorDashboard user={currentUser} />;
      case 'admin':
        return <AdminDashboard user={currentUser} />;
      default:
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Welcome, {currentUser.name}!
            </h2>
            <p className="text-neutral-600">
              Your dashboard is being prepared. Please contact support if this persists.
            </p>
          </div>
        );
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!currentUser) {
    return <LoginPage onLogin={setCurrentUser} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-strong border-b border-white/20 dark:border-white/10 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              {...fadeInLeft}
              className="flex items-center space-x-3"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Calendar className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gradient">
                KAISRI
              </h1>
            </motion.div>

            <div className="hidden md:flex items-center space-x-4">
              {/* User Profile Section */}
              <motion.div 
                {...fadeInUp}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl glass border border-white/20 dark:border-white/10"
              >
                <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-200">
                  {currentUser && getUserIcon()}
                  <span className="font-medium">
                    {currentUser.name}
                  </span>
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 text-xs font-semibold bg-primary-500/20 text-primary-700 dark:text-primary-300 rounded-full capitalize border border-primary-500/30"
                  >
                    {currentUser.role}
                  </motion.span>
                </div>
              </motion.div>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-3 rounded-xl glass border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
                >
                  <Bell className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 card-glass border border-white/20 dark:border-white/10 rounded-2xl z-10 max-h-96 overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10">
                        <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">Notifications</h4>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map(n => (
                            <motion.div
                              key={n.id}
                              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                              onClick={() => handleMarkAsRead(n.id)}
                              className={`p-4 border-b border-white/5 last:border-b-0 cursor-pointer transition-colors ${!n.isRead ? 'bg-primary-500/10' : ''}`}
                            >
                              <p className="text-sm text-neutral-700 dark:text-neutral-200">{n.message}</p>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                {n.createdAt?.seconds ? new Date(n.createdAt.seconds * 1000).toLocaleString() : 'No date'}
                              </p>
                            </motion.div>
                          ))
                        ) : (
                          <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
                            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>No notifications yet</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 glass rounded-xl border border-white/20 dark:border-white/10 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl glass border border-white/20 dark:border-white/10 transition-colors"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden py-4 border-t border-white/20 dark:border-white/10 overflow-hidden"
              >
                <div className="flex items-center space-x-3 px-3 py-3 mb-4 rounded-xl glass">
                  {currentUser && getUserIcon()}
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    {currentUser.name}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-primary-500/20 text-primary-700 dark:text-primary-300 rounded-full capitalize">
                    {currentUser.role}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <ThemeToggle showLabel className="w-full justify-start px-3 py-2" />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-neutral-600 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 rounded-xl glass transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1"
      >
        {renderDashboard()}
      </motion.main>
    </div>
  );
}

export default App;
