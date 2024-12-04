// pages/signup.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

const SignupPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Signup Page (Under Construction)
        </Typography>
      </Container>
    </>
  );
};

export default SignupPage;
