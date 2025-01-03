// pages/dashboard/admin.tsx

import { GetServerSideProps } from 'next';
import jwt from 'jsonwebtoken';
import DashboardLayout from '@/components/DashboardLayout';

interface AdminDashboardProps {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  return (
    <DashboardLayout>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.email}!</p>
      {/* Admin-specific components */}
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as {
      userId: string;
      email: string;
      role: string;
    };

    if (decoded.role !== 'Admin') {
      return {
        redirect: {
          destination: '/unauthorized',
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: decoded,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default AdminDashboard;
