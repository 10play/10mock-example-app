import {lightTheme, darkTheme} from './themes';
import {ThemeType} from '../types';

export const theme = (currentTheme: ThemeType) => {
  switch (currentTheme) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
  }
};
