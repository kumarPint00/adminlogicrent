import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Select, MenuItem, Box, Grid, Card, CardContent, Avatar, SelectChangeEvent } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

interface InfoCardProps {
  title: string;
  mainValue: number;
  ocdValue: number;
  appValue: number;
}

interface ListingCardProps {
  title: string;
  value1: number;
  value2: string;
}

interface DashboardData {
  totalLeads: InfoCardProps;
  phoneCalls: InfoCardProps;
  whatsapp: InfoCardProps;
  enquiry: InfoCardProps;
  liveListing: InfoCardProps;
  refreshesDone: { mainValue: number; secondaryValue: string };
  featuredListing: ListingCardProps;
  premiumListing: ListingCardProps;
  monthlyLead: ListingCardProps;
}

const DashboardHeader: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
    <Box sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  }}>
  <Select value="branch" displayEmpty inputProps={{ 'aria-label': 'Switch Branches' }} sx={{ color: 'white', mr: 2 }}>
        <MenuItem value="branch">Switch Branches</MenuItem>
      </Select>
      <PeriodSelector/>
  </Box>
    </Toolbar>
  </AppBar>
);

const PeriodSelector: React.FC = () => (
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Typography variant="h6">Period:</Typography>
    <Select value="lastOneMonth" displayEmpty inputProps={{ 'aria-label': 'Period' }} sx={{ minWidth: 200 }}>
      <MenuItem value="lastOneMonth">Last one month</MenuItem>
    </Select>
    <Typography>Date Selected: Jan 03, 2024 - Feb 02, 2024</Typography>
  </Box>
);

const InfoCard: React.FC<InfoCardProps> = ({ title, mainValue, ocdValue, appValue }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{mainValue}</Typography>
      <Typography variant="body2">OCD Website: {ocdValue}</Typography>
      <Typography variant="body2">OCD Apps: {appValue}</Typography>
    </CardContent>
  </Card>
);

const ListingCard: React.FC<ListingCardProps> = ({ title, value1, value2 }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value1}</Typography>
      <Typography variant="body2">{value2}</Typography>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    axios.get('/api/dashboardData').then((response) => {
      setData(response.data);
    });
  }, []);

  // if (!data) {
  //   return <Typography>Loading...</Typography>;
  // }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <DashboardHeader />
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <PeriodSelector /> */}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InfoCard {...data?.totalLeads} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InfoCard {...data?.phoneCalls} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InfoCard {...data?.whatsapp} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InfoCard {...data?.enquiry} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InfoCard {...data?.liveListing} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Refreshes Done</Typography>
                <Typography variant="h4">{data?.refreshesDone.mainValue}</Typography>
                <Typography variant="body2">{data?.refreshesDone.secondaryValue}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ListingCard {...data?.featuredListing} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ListingCard {...data?.premiumListing} />
          </Grid>
          <Grid item xs={12}>
            <ListingCard {...data?.monthlyLead} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard; 
