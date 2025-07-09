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
    // Always start with default theme, but respect saved preference after initial load
    if (savedTheme && savedTheme === 'coral-reef') {
      // Small delay to ensure smooth initial load
      setTimeout(() => {
        setThemeState(savedTheme);
      }, 100);
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
      }, 1200); // Reduced for smoother feel
    }, 400); // Slightly longer for better effect buildup
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