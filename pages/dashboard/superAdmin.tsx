// pages/dashboard/superadmin.tsx

import withAuth from '@/components/withAuth';
import DashboardLayout from '../../components/DashboardLayout';

const SuperAdminDashboard = () => {
  return (
    <DashboardLayout>
      <h1>SuperAdmin Dashboard</h1>
      {/* SuperAdmin-specific components */}
    </DashboardLayout>
  );
};

export default withAuth(SuperAdminDashboard, ['SuperAdmin']);
