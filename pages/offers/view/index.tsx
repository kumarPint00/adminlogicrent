// SubmittedOffersView.js
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const rows = [
  { id: 1, car: 'Car 1', offerAmount: 1000, bannerDescription: 'Description 1', bannerImage: 'Image 1' },
  { id: 2, car: 'Car 2', offerAmount: 2000, bannerDescription: 'Description 2', bannerImage: 'Image 2' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'car', headerName: 'Car', width: 130 },
  { field: 'offerAmount', headerName: 'Offer Amount', width: 130 },
  { field: 'bannerDescription', headerName: 'Banner Description', width: 200 },
  { field: 'bannerImage', headerName: 'Banner Image', width: 200 },
];

const SubmittedOffersView = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <Typography variant="h4">Submitted Offers</Typography>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default SubmittedOffersView;
