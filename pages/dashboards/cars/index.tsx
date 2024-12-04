import React from 'react';
import { Box, Grid } from '@mui/material';
import DashboardHeader from './DashboardHearder';
import PeriodSelector from './PeriodSelector';
import InfoCard from './InfoCard';
import ListingCard from './ListingCard';
import { HumanMaleBoardPoll, LibraryShelves, SearchWeb, Whatsapp } from 'mdi-material-ui';
import { Phone } from '@medusajs/icons';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header and Period Selector */}
      <DashboardHeader />
      <Box p={2}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <PeriodSelector />
          </Grid> */}

          {/* Info Cards */}
          <Grid item xs={12} md={6} lg={3}>
            <InfoCard
              icon={<HumanMaleBoardPoll />}
              title="Total Users"
              mainValue={130}
              ocdValue={160}
              appValue={30}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InfoCard
              icon={<Phone />}
              title="Phone Calls"
              mainValue={110}
              ocdValue={160}
              appValue={30}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InfoCard
              icon={<Whatsapp />}
              title="WhatsApp"
              mainValue={250}
              ocdValue={160}
              appValue={30}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InfoCard
              icon={<SearchWeb />}
              title="Enquiry"
              mainValue={40}
              ocdValue={160}
              appValue={30}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InfoCard
              icon={<LibraryShelves />}  // Replace null with a meaningful icon
              title="Live Listing"
              mainValue={40}
              ocdValue={10}
              appValue={10}
            />
          </Grid>

          {/* Listing Cards */}
          <Grid item xs={12} md={6} lg={3}>
            <ListingCard title="Featured Listing" value1={160} value2="Not Subscribed Leads" />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ListingCard title="Premium Listing" value1={160} value2="Not Subscribed Leads" />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ListingCard title="Monthly Lead" value1={160} value2="Leads" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
