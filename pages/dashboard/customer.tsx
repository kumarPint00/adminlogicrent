// pages/dashboard/customer.tsx

import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import withAuth from '@/components/withAuth';

const CustomerDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container">
      <h1>Customer Dashboard</h1>
      <p>Welcome, {user?.email}!</p>
      {/* Customer-specific components */}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default withAuth(CustomerDashboard, ['Customer']);
