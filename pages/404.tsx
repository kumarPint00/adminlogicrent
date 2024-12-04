import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      {/* Illustration or Icon */}
      <Box
        sx={{
          mb: 3,
          width: 120,
          height: 120,
          backgroundColor: '#f5f5f5',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#ff4081',
          }}
        >
          404
        </Typography>
      </Box>

      {/* Heading */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Page Not Found
      </Typography>

      {/* Subheading */}
      <Typography variant="body1" sx={{ color: 'gray', mb: 4 }}>
        Sorry, we couldn’t find the page you were looking for.
      </Typography>

      {/* Buttons */}
      <Box>
        <Link href="/" passHref>
          <Button
            variant="contained"
            sx={{ marginRight: 2, backgroundColor: '#1976d2' }}
          >
            Go to Homepage
          </Button>
        </Link>

        <Link href="/contact" passHref>
          <Button variant="outlined" color="secondary">
            Report Issue
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
