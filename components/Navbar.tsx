// components/Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import Link from 'next/link';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const { toggleColorMode } = useThemeContext();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          CarBooking Admin
        </Typography>
        <Box>
          <IconButton sx={{ mr: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Link href="/login" passHref>
            <Button color="primary">Login</Button>
          </Link>
          <Link href="/signup" passHref>
            <Button variant="contained" color="primary" sx={{ ml: 2 }}>
              Sign Up
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
