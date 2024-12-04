// components/FeatureCard.tsx
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          maxWidth: 345,
          m: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
          borderRadius: '15px',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
          },
        }}
      >
        <CardMedia component="img" height="140" image={image} alt={`${title} icon`} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.300' }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
