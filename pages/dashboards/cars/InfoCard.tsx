import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const InfoCard = ({ icon, title, mainValue, ocdValue, appValue }) => (
  <Card
    sx={{
      display: 'flex',
      alignItems: 'center',
      padding: 2,
      borderRadius: 2,
      boxShadow: 3,
      bgcolor: '#f5f5f5',
      '&:hover': {
        boxShadow: 6,
      },
    }}
  >
    <Box sx={{ marginRight: 2 }}>{icon}</Box>
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography
        variant="h6"
        sx={{
          color: '#1976d2',
          fontWeight: 'bold',
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: '#424242',
          fontWeight: '500',
          mb: 2,
        }}
      >
        {mainValue}
      </Typography>
      <Typography variant="body2" sx={{ color: '#757575' }}>
        OCD Website: {ocdValue}
      </Typography>
      <Typography variant="body2" sx={{ color: '#757575' }}>
        OCD Apps: {appValue}
      </Typography>
    </CardContent>
  </Card>
);

export default InfoCard;
