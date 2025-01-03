// components/DashboardCharts.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardCharts: React.FC<{
  bookings: BookingData[];
  revenue: RevenueData[];
  userActivity: UserActivityData[];
}> = ({ bookings, revenue, userActivity }) => {
  return (
    <div>
      <Typography variant="h6">Bookings Over Time</Typography>
      <LineChart width={600} height={300} data={bookings}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>

      <Typography variant="h6">Revenue by Month</Typography>
      <BarChart width={600} height={300} data={revenue}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#82ca9d" />
      </BarChart>

      <Typography variant="h6">User Activity</Typography>
      <PieChart width={400} height={400}>
        <Pie
          data={userActivity}
          dataKey="activity"
          nameKey="user"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {userActivity.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default DashboardCharts;
