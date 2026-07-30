import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USER = {
  id: 'user-001',
  firstName: 'Praveen',
  lastName: 'Krishna',
  name: 'Praveen Krishna',
  email: 'praveenkrish1805@gmail.com',
  password: 'password123',
  phone: '+91 9876543210',
  address: '123 Beauty Lane, T. Nagar',
  city: 'Chennai',
  state: 'Tamil Nadu',
  zip: '600017',
  country: 'India',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
};

const DEFAULT_USERS = [
  DEMO_USER,
  {
    id: 'user-002',
    firstName: 'Sophia',
    lastName: 'Varghese',
    name: 'Sophia Varghese',
    email: 'demo@prbeauty.com',
    password: 'password123',
    phone: '+91 9123456789',
    address: '456 Rose Garden Way',
    city: 'Bengaluru',
    state: 'Karnataka',
    zip: '560001',
    country: 'India',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
];

export const AuthProvider = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('aura_registered_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing registered users from localStorage:', e);
      }
    }
    localStorage.setItem('aura_registered_users', JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('aura_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem('aura_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aura_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('aura_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const foundUser = registeredUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!foundUser) {
      return {
        success: false,
        error: 'USER_NOT_FOUND',
        message: 'No account found with this email. You are a new user — please sign up first!',
      };
    }

    if (foundUser.password && foundUser.password !== password) {
      return {
        success: false,
        error: 'INVALID_PASSWORD',
        message: 'Incorrect password. Please check your password and try again.',
      };
    }

    setCurrentUser(foundUser);
    return {
      success: true,
      user: foundUser,
    };
  };

  const signup = (userData) => {
    const normalizedEmail = userData.email.trim().toLowerCase();
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (existing) {
      return {
        success: false,
        error: 'EMAIL_EXISTS',
        message: 'An account with this email already exists. Please sign in instead!',
      };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      name: `${userData.firstName.trim()} ${userData.lastName.trim()}`,
      email: normalizedEmail,
      password: userData.password,
      phone: userData.phone || '',
      address: userData.address || '',
      city: userData.city || '',
      state: userData.state || '',
      zip: userData.zip || '',
      country: 'India',
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return {
      success: true,
      user: newUser,
    };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const loginAsDemo = () => {
    const foundDemo = registeredUsers.find((u) => u.email.toLowerCase() === DEMO_USER.email.toLowerCase()) || DEMO_USER;
    setCurrentUser(foundDemo);
    return foundDemo;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        registeredUsers,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        loginAsDemo,
      }}
    >
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
};
