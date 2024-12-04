// components/TestimonialCard.tsx
import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface TestimonialCardProps {
  name: string;
  feedback: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, feedback, avatar }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 3,
        border: '1px solid #ddd',
        borderRadius: '15px',
        backgroundColor: '#ffffff',
        color: '#000',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }}
    >
      <Avatar
        src={avatar}
        alt={name}
        sx={{ width: 80, height: 80, margin: '0 auto', mb: 2 }}
      />
      <Typography
        variant="body1"
        sx={{
          fontStyle: 'italic',
          color: '#555',
        }}
      >
        "{feedback}"
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold', color: '#1976d2' }}>
        - {name}
      </Typography>
    </Box>
  );
};

export default TestimonialCard;
