// pages/dashboard.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import { verifyToken, JwtPayload } from '../lib/jwt';
import { Typography, Container } from '@mui/material';

interface DashboardProps {
  user: JwtPayload;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <Container>
      <Typography variant="h4">Welcome, {user.role}</Typography>
      {/* Dashboard content based on role */}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const payload = verifyToken(token);

  if (!payload) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: payload,
    },
  };
};

export default Dashboard;
