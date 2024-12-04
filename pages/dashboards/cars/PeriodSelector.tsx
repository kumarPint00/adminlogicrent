import React from 'react';
import { Box, Typography, Select, MenuItem } from '@mui/material';

const PeriodSelector = () => (
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Typography variant="h6">Period:</Typography>
    <Select value="lastOneMonth" displayEmpty inputProps={{ 'aria-label': 'Period' }} sx={{ minWidth: 200 }}>
      <MenuItem value="lastOneMonth">Last one month</MenuItem>
    </Select>
    <Typography>Date Selected: Jan 03, 2024 - Feb 02, 2024</Typography>
  </Box>
);

export default PeriodSelector;
