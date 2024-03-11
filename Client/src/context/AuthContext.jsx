import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverApiUrl } from '../Constants/urls'; // Ensure correct path

const AuthContext = createContext(); // Creating context

export const useAuth = () => useContext(AuthContext); // Exporting the hook for consuming context

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const fullServerUrl = serverApiUrl;
    
    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          const response = await fetch(`${fullServerUrl}/auth/login/success`, {
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
        }
      };
      checkAuthStatus();
    }, []);
  
    const logout = async () => {
      try {
        const response = await fetch(`${fullServerUrl}/auth/logout`, {
          method: 'PUT',
          credentials: 'include',
        });
        if (response.ok) {
          setUser(null);
          navigate('/login');
        }
      } catch (error) {
        console.error("Error logging out", error);
      }
    };
  
    const value = {
      user,
      logout
    };
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

  