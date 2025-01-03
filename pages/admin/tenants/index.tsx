// pages/admin/tenants/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

interface Tenant {
  id: string;
  name: string;
}

const TenantsPage: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const fetchTenants = async () => {
    try {
      const response = await axios.get('/api/tenants');
      setTenants(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleAdd = async () => {
    try {
      await axios.post('/api/tenants', { name });
      setOpen(false);
      setName('');
      fetchTenants();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error adding tenant');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tenant Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Tenant
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tenants.map((tenant) => (
            <TableRow key={tenant.id}>
              <TableCell>{tenant.id}</TableCell>
              <TableCell>{tenant.name}</TableCell>
              <TableCell>
                {/* Add Edit and Delete buttons */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Tenant Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Tenant</DialogTitle>
        <DialogContent>
          <TextField
            label="Tenant Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
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

export default TenantsPage;
