import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ListingCard = ({ title, value1, value2 }) => (
  <Card 
    sx={{ 
      maxWidth: 345, 
      borderRadius: 2, 
      boxShadow: 3, 
      bgcolor: '#f5f5f5',
      '&:hover': {
        boxShadow: 6,
      }
    }}
  >
    <CardContent>
      <Typography 
        variant="h6" 
        sx={{ 
          color: '#1976d2', 
          fontWeight: 'bold', 
          mb: 1 
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="h4" 
        sx={{ 
          color: '#424242', 
          fontWeight: '500', 
          mb: 2 
        }}
      >
        {value1}
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#757575' 
        }}
      >
        {value2}
      </Typography>
    </CardContent>
  </Card>
);

export default ListingCard;
