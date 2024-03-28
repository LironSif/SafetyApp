import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverApiUrl } from '../Constants/urls'; // Ensure this path is correct

const AuthContext = createContext(); // Creating context

export const useAuth = () => useContext(AuthContext); // Exporting the hook for consuming context

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();

  // Function to check authentication status
  const checkAuthStatus = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(`${serverApiUrl}/auth/login/success`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching auth status", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Expose a method to refresh user data
  const refreshUserData = async () => {
    await checkAuthStatus();
  };

  const logout = async () => {
    try {
      const response = await fetch(`${serverApiUrl}/auth/logout`, {
        method: 'PUT',
        credentials: 'include',
      });
      if (response.ok) {
        // Remove specific fields from local storage
        localStorage.removeItem('_grecaptcha');
        localStorage.removeItem('factoryId');
        localStorage.removeItem('userId');
        localStorage.removeItem('userID');
  
        // Set user to null and navigate to login
        setUser(null);
        navigate('/login');
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };
  

  const value = {
    user,
    isLoading, // Include isLoading in the context value
    logout,
    refreshUserData, // Include refreshUserData function for components to trigger user data refresh
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
