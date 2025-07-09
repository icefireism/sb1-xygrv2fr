import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'default' | 'coral-reef';

interface ThemeContextType {
  theme: Theme;
  isTransitioning: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('default');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('july12th-theme') as Theme;
    if (savedTheme && (savedTheme === 'default' || savedTheme === 'coral-reef')) {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    if (newTheme === theme) return;
    
    setIsTransitioning(true);
    
    // Add a delay to allow for transition effects
    setTimeout(() => {
    setThemeState(newTheme);
    localStorage.setItem('july12th-theme', newTheme);
      
      // End transition after theme change
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1500); // Match the transition duration
    }, 300);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'default' ? 'coral-reef' : 'default';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, isTransitioning, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};