import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define theme colors
const lightTheme = {
  primary: '#4361EE',
  secondary: '#3F37C9',
  background: '#F7F7F9',
  card: '#FFFFFF',
  text: '#1A1A2E',
  border: '#E0E0E0',
  notification: '#FF4D6D',
  success: '#06D6A0',
  warning: '#FFD166',
  error: '#EF476F',
  gray: '#9E9E9E',
};

const darkTheme = {
  primary: '#4CC9F0',
  secondary: '#4895EF',
  background: '#121212',
  card: '#1E1E1E',
  text: '#F7F7F9',
  border: '#333333',
  notification: '#FF4D6D',
  success: '#06D6A0',
  warning: '#FFD166',
  error: '#EF476F',
  gray: '#9E9E9E',
};

type ThemeContextType = {
  theme: 'light' | 'dark';
  colors: typeof lightTheme;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(colorScheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    // Update theme when system theme changes
    if (colorScheme) {
      setTheme(colorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};