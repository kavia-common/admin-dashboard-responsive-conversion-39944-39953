import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// PUBLIC_INTERFACE
/**
 * AppProvider - Global state management provider
 * Manages user preferences, theme, and application state with localStorage persistence
 */
export function AppProvider({ children }) {
  const [preferences, setPreferences] = useState(() => {
    const stored = localStorage.getItem('app_preferences');
    return stored ? JSON.parse(stored) : {
      theme: 'light',
      sidebarCollapsed: false,
      notificationsEnabled: true
    };
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user_data');
    return stored ? JSON.parse(stored) : null;
  });

  // Persist preferences to localStorage
  useEffect(() => {
    localStorage.setItem('app_preferences', JSON.stringify(preferences));
  }, [preferences]);

  // Persist user data to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user_data', JSON.stringify(user));
    } else {
      localStorage.removeItem('user_data');
    }
  }, [user]);

  const updatePreferences = (updates) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const value = {
    preferences,
    updatePreferences,
    user,
    setUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// PUBLIC_INTERFACE
/**
 * useApp - Hook to access global application state
 * @returns {Object} Application state and actions
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
