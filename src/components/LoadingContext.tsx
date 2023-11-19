import React, { createContext, useContext, useState } from 'react';

// Define the context type
type LoadingContextType = {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
  children?: React.ReactNode; // Adding this line to include children
};

// Create the context with an initial value
const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setLoading: () => {},
  // children is optional and doesn't need an initial value
});

// Provide the context
export const LoadingProvider: React.FC<LoadingContextType> = ({ children, ...rest }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, ...rest }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the context
export const useLoading = () => useContext(LoadingContext);
