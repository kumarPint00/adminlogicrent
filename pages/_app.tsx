// pages/_app.tsx (Updated)
import React from 'react';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import ErrorBoundary from '../components/ErrorBoundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider >
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default MyApp;
