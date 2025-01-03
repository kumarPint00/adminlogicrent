// pages/dashboard/tenantadmin.tsx

import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import withAuth from '@/components/withAuth';

const TenantAdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container">
      <h1>TenantAdmin Dashboard</h1>
      <p>Welcome, {user?.email}!</p>
      {/* TenantAdmin-specific components */}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default withAuth(TenantAdminDashboard, ['TenantAdmin']);
