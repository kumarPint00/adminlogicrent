// pages/dashboard/carprovider.tsx

import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import withAuth from '@/components/withAuth';

const CarProviderDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container">
      <h1>CarProvider Dashboard</h1>
      <p>Welcome, {user?.email}!</p>
      {/* CarProvider-specific components */}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default withAuth(CarProviderDashboard, ['CarProvider']);
