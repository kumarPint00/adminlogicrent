import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

export default function InternalServerErrorPage() {
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
            color: '#d32f2f',
          }}
        >
          500
        </Typography>
      </Box>

      {/* Heading */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Internal Server Error
      </Typography>

      {/* Subheading */}
      <Typography variant="body1" sx={{ color: 'gray', mb: 4 }}>
        Something went wrong on our end. Please try again later.
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

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    </Container>
  );
}
