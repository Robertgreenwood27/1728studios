import React, { createContext, useContext, useState } from 'react';

// Create the context
const LoadingContext = createContext({
  isLoading: false,
  setLoading: (state: boolean) => {}
});

// Provide the context
export const LoadingProvider: React.FC = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the context
export const useLoading = () => useContext(LoadingContext);
