// pages/index.tsx
import React from 'react';
import { Box, Button, Typography, Grid, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import Image from 'next/image';
import Head from 'next/head';

// Import images from public folder
import heroBg from '../public/images/hero-bg.jpeg';


const LandingPage: React.FC = () => {
  const features = [
    {
      title: 'Authentication',
      description: 'Secure login and signup with role-based access control.',
      image: '/images/feature1.jpeg',
    },
    {
      title: 'Tenant Management',
      description: 'Manage multiple tenants with isolated data.',
      image: '/images/feature2.jpeg',
    },
    {
      title: 'Car & Booking Management',
      description: 'Efficiently manage cars and bookings with ease.',
      image: '/images/feature3.jpeg',
    },
  ];

  const testimonials = [
    {
      name: 'John Doe',
      feedback: 'This platform has completely transformed the way I manage my car rentals!',
      avatar: '/images/testimonial1.jpeg',
    },
    {
      name: 'Jane Smith',
      feedback: 'Reliable and user-friendly. Highly recommend to other car rental businesses.',
      avatar: '/images/testimonial2.jpeg',
    },
    {
      name: 'Robert Brown',
      feedback: 'The tenant management feature is a game-changer for our operations.',
      avatar: '/images/testimonial3.jpeg',
    },
  ];

  return (
    <>
      <Head>
        <title>CarBooking Admin Dashboard</title>
        <meta
          name="description"
          content="Manage your car bookings effortlessly with our intuitive admin dashboard."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      
      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Image
          src={heroBg}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          quality={75}
          priority
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6))',
          }}
        />
        <Container sx={{ zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(to right, #ff6f61, #ff4081)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to Your Trusted Car Rental Platform
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: '#f5f5f5',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            }}
          >
            List your cars and get bookings from our vast customer base.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/signup"
            sx={{
              backgroundColor: '#ff4081',
              '&:hover': {
                backgroundColor: '#e91e63',
              },
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(to right, #1976d2, #64b5f6)',
          color: 'white',
        }}
      >
        <Container>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              textAlign: 'center',
              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)',
            }}
          >
            Why Choose Us?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  image={feature.image}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, backgroundColor: '#1e88e5', color: 'white' }}>
        <Container>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              textAlign: 'center',
              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)',
            }}
          >
            What Our Users Say
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <TestimonialCard
                  name={testimonial.name}
                  feedback={testimonial.feedback}
                  avatar={testimonial.avatar}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call-to-Action (CTA) */}
      <Box
        sx={{
          py: 8,
          textAlign: 'center',
          background: 'linear-gradient(to left, #ff4081, #f50057)',
          color: 'white',
        }}
      >
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Ready to Transform Your Car Rental Business?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Start using our platform today and see the difference.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/signup"
            sx={{
              backgroundColor: '#ffffff',
              color: '#ff4081',
              '&:hover': {
                backgroundColor: '#ffeef0',
              },
            }}
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          textAlign: 'center',
          backgroundColor: '#333',
          color: 'white',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} CarBooking Admin. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default LandingPage;
