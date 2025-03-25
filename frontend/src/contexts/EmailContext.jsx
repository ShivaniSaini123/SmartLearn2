// src/contexts/EmailContext.js
import React, { createContext, useState, useEffect } from 'react';

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(() => {
    // Read email from local storage on initialization
    return localStorage.getItem('userEmail') || null;
  });

  useEffect(() => {
    if (email) {
      // Save email to local storage whenever it changes
      localStorage.setItem('userEmail', email);
    } else {
      // Clear email from local storage when null
      localStorage.removeItem('userEmail');
    }
  }, [email]);

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};