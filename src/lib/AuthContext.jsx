import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '@/api/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null); // Contains only { id, public_settings }

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkUserAuth();
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setIsLoadingPublicSettings(false);
      }
    };
    initializeAuth();
  }, []);

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      const isAuth = await auth.isAuthenticated();
      
      if (isAuth) {
        const currentUser = await auth.me();
        if (currentUser && currentUser.email) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoadingAuth(false);
      setAuthChecked(true);
      setAuthError(null);
    } catch (error) {
      console.error('User auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
      setIsLoadingAuth(false);
      setAuthChecked(true);
      setAuthError(error.message || 'Auth failed');
    }
  };

  const logout = (shouldRedirect = true) => {
    if (shouldRedirect) {
      // Redirect first to avoid flash of 404
      auth.logout(window.location.origin + '/');
    } else {
      setUser(null);
      setIsAuthenticated(false);
      auth.logout();
    }
  };

  const navigateToLogin = () => {
    auth.redirectToLogin('/dashboard');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
