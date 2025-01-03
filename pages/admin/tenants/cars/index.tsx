// pages/tenant/cars/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

interface Car {
  id: string;
  model: string;
  // Other fields...
}

const CarsPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState('');
  const [error, setError] = useState('');

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

  const handleAdd = async () => {
    try {
      await axios.post('/api/cars', { model });
      setOpen(false);
      setModel('');
      fetchCars();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error adding car');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Car Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Car
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>{car.id}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>
                {/* Add Edit and Delete buttons */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Car Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Car</DialogTitle>
        <DialogContent>
          <TextField
            label="Model"
            fullWidth
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CarsPage;
