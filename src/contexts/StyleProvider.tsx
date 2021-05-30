import React, {useState, createContext, useContext, useEffect} from 'react';
import {IThemeContext, SetCurrentTheme, ThemeHook, ThemeType} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from '../components';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {theme} from '../helpers';

const ThemeContext = createContext<IThemeContext>({
  currentTheme: 'dark',
  setCurrentTheme: (theme) => {
    return theme;
  },
});

export const StyleProvider = ({children}: {children: React.ReactNode}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('dark');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const previousTheme = await AsyncStorage.getItem('theme');
        if (previousTheme === 'light') {
          setCurrentTheme('light');
        }
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <StatusBar
        backgroundColor={currentTheme === 'light' ? '#CCCCCC' : '#20232A'}
      />
      <ThemeContext.Provider value={{currentTheme, setCurrentTheme}}>
        <ThemeProvider theme={() => theme(currentTheme)}>
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};

export const useTheme = (): ThemeHook => {
  const {
    currentTheme,
    setCurrentTheme,
  }: {currentTheme: ThemeType; setCurrentTheme: SetCurrentTheme} = useContext(
    ThemeContext,
  );

  const isDark: boolean = currentTheme === 'dark';

  const toggleTheme = async () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  return {currentTheme, toggleTheme, isDark};
};
