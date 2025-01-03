// pages/tenant/transactions/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button } from '@mui/material';

interface Transaction {
  id: string;
  amount: number;
  status: string;
  date: string;
  // Other fields...
}

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [status, setStatus] = useState('');

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions', {
        params: {
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          minAmount: minAmount || undefined,
          maxAmount: maxAmount || undefined,
          status: status || undefined,
        },
      });
      setTransactions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleFilter = () => {
    fetchTransactions();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Transaction History
      </Typography>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <TextField
          label="Min Amount"
          type="number"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
        <TextField
          label="Max Amount"
          type="number"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
        />
        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filter
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            {/* Other fields */}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((txn) => (
            <TableRow key={txn.id}>
              <TableCell>{txn.id}</TableCell>
              <TableCell>{txn.amount}</TableCell>
              <TableCell>{txn.status}</TableCell>
              <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
              {/* Other fields */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default TransactionsPage;
