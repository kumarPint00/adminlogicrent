// pages/tenant/bookings/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface Booking {
  id: string;
  carId: string;
  userId: string;
  status: string;
  date: string;
  // Other fields...
}

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings', { params: { status: statusFilter || undefined } });
      setBookings(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Booking Management
      </Typography>
      <FormControl variant="outlined" margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          label="Status"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
        </Select>
      </FormControl>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Car ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>{booking.carId}</TableCell>
              <TableCell>{booking.userId}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
              <TableCell>
                {/* Add Edit and Delete buttons */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default BookingsPage;
