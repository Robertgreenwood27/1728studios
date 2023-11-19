import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
type LoadingContextType = {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
};

// Create the context with an initial value
const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setLoading: () => {},
});

// Define the props for LoadingProvider
type LoadingProviderProps = {
  children: ReactNode;
};

// Provide the context
export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the context
export const useLoading = () => useContext(LoadingContext);
