import React, { createContext, useState, useEffect } from 'react';

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(() => {
    // Read email from local storage on initialization
    return localStorage.getItem('userEmail') || null;
  });

  const [branch, setBranch] = useState(() => {
    // Read branch from local storage on initialization
    return localStorage.getItem('userBranch') || null;
  });

  useEffect(() => {
    if (email) {
      // Save email to local storage whenever it changes
      localStorage.setItem('userEmail', email);
    } else {
      // Clear email from local storage when null
      localStorage.removeItem('userEmail');
    }

    if (branch) {
      // Save branch to local storage whenever it changes
      localStorage.setItem('userBranch', branch);
    } else {
      // Clear branch from local storage when null
      localStorage.removeItem('userBranch');
    }
  }, [email, branch]);

  return (
    <EmailContext.Provider value={{ email, setEmail, branch, setBranch }}>
      {children}
    </EmailContext.Provider>
  );
};
