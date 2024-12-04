import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Select, MenuItem, Box, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import PeriodSelector from './PeriodSelector';

const DashboardHeader = () => (
  <AppBar position="static">
    <Toolbar>
      {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Logic Car Rentals
      </Typography> */}
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

      {/* <IconButton color="inherit">
        <NotificationsIcon />
      </IconButton>
      <Avatar alt="User" src="/static/images/avatar/1.jpg" sx={{ mx: 2 }} />
      <IconButton color="inherit">
        <LogoutIcon />
      </IconButton> */}
    </Toolbar>
  </AppBar>
);

export default DashboardHeader;
