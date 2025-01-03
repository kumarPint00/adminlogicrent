// styles/theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark'): ThemeOptions =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2', // Your primary color
      },
      secondary: {
        main: '#dc004e', // Your secondary color
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1d1d1d',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
        secondary: '#555555',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      h2: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 600,
      },
      // ... other typography settings
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 15,
            backdropFilter: 'blur(10px)',
          },
        },
      },
      // ... other component customizations
    },
  });

export default getTheme;
