// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
