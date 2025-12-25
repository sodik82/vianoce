import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { reportEG } from '../ga';

interface EasterEggContextType {
  visited: Record<string, boolean>;
  count: number;
  total: number;
  showFinal: boolean;
  register: (name: string) => void;
  onVisit: (name: string) => void;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

interface EasterEggProviderProps {
  children: ReactNode;
}

export const EasterEggProvider: React.FC<EasterEggProviderProps> = ({ children }) => {
  const [visited, setVisited] = useState<Record<string, boolean>>({});
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  const countVisited = useCallback((visitedMap: Record<string, boolean>) => {
    return Object.values(visitedMap).filter((v) => v).length;
  }, []);

  const register = useCallback((name: string) => {
    setVisited((prev) => {
      // Only register if not already registered
      if (name in prev) {
        return prev;
      }
      const newVisited = { ...prev, [name]: false };
      setTotal(Object.keys(newVisited).length);
      return newVisited;
    });
  }, []);

  const onVisit = useCallback((name: string) => {
    console.log('onVisit', name, visited);

    setVisited((prev) => {
      // If already visited, don't update
      if (prev[name] === true) {
        return prev;
      }

      const newVisited = { ...prev, [name]: true };
      const previousCount = countVisited(prev);
      const newCount = countVisited(newVisited);

      if (previousCount === newCount) {
        return prev;
      }

      // Report to analytics
      reportEG(name);
      setCount(newCount);

      // Check if all eggs found
      if (newCount === Object.keys(newVisited).length) {
        reportEG('FINAL');
        setTimeout(() => setShowFinal(true), 1500);
      }

      return newVisited;
    });
  }, [visited, countVisited]);

  const value: EasterEggContextType = {
    visited,
    count,
    total,
    showFinal,
    register,
    onVisit,
  };

  return (
    <EasterEggContext.Provider value={value}>
      {children}
    </EasterEggContext.Provider>
  );
};

export const useEasterEgg = (): EasterEggContextType => {
  const context = useContext(EasterEggContext);
  if (context === undefined) {
    throw new Error('useEasterEgg must be used within an EasterEggProvider');
  }
  return context;
};
