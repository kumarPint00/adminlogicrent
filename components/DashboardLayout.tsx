// components/DashboardLayout.tsx

import AuthContext from '@/contexts/AuthContext';
import Link from 'next/link';
import { useContext } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useContext(AuthContext);

  const navLinks = [
    { href: '/dashboard/superadmin', label: 'SuperAdmin', roles: ['SuperAdmin'] },
    { href: '/dashboard/admin', label: 'Admin', roles: ['Admin'] },
    { href: '/dashboard/carprovider', label: 'CarProvider', roles: ['CarProvider'] },
    { href: '/dashboard/customer', label: 'Customer', roles: ['Customer'] },
    { href: '/dashboard/tenantadmin', label: 'TenantAdmin', roles: ['TenantAdmin'] },
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            {navLinks
              .filter((link) => link.roles.includes(user?.role || ''))
              .map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
          </ul>
        </nav>
        <button onClick={logout}>Logout</button>
      </aside>
      <main className="content">{children}</main>
      <style jsx>{`
        .dashboard-container {
          display: flex;
          height: 100vh;
        }
        .sidebar {
          width: 250px;
          background-color: #f0f0f0;
          padding: 20px;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        }
        .sidebar h2 {
          margin-bottom: 20px;
        }
        .sidebar nav ul {
          list-style: none;
          padding: 0;
        }
        .sidebar nav li {
          margin-bottom: 10px;
        }
        .sidebar nav a {
          text-decoration: none;
          color: #333;
        }
        .sidebar nav a:hover {
          text-decoration: underline;
        }
        .content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
