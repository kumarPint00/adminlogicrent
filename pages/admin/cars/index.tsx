// pages/admin/cars/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

interface Car {
  id: string;
  model: string;
  tenantId: string;
  // Other fields...
}

const AllCarsPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  const fetchCars = async () => {
    try {
      const response = await axios.get('/api/cars');
      setCars(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Cars
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Tenant ID</TableCell>
            {/* Other fields */}
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>{car.id}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.tenantId}</TableCell>
              {/* Other fields */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AllCarsPage;
