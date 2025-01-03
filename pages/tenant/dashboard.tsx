// pages/tenant/dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import DashboardCharts from '../../components/DashboardCharts';

interface BookingData {
  date: string;
  count: number;
}

interface RevenueData {
  month: string;
  revenue: number;
}

interface UserActivityData {
  user: string;
  activity: number;
}

const TenantDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [revenue, setRevenue] = useState<RevenueData[]>([]);
  const [userActivity, setUserActivity] = useState<UserActivityData[]>([]);

  const fetchAnalytics = async () => {
    try {
      const [bookingsRes, revenueRes, userActivityRes] = await Promise.all([
        axios.get('/api/analytics/bookings'),
        axios.get('/api/analytics/revenue'),
        axios.get('/api/analytics/user-activity'),
      ]);
      setBookings(bookingsRes.data);
      setRevenue(revenueRes.data);
      setUserActivity(userActivityRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tenant Admin Dashboard
      </Typography>
      <DashboardCharts bookings={bookings} revenue={revenue} userActivity={userActivity} />
    </Container>
  );
};

export default TenantDashboard;
