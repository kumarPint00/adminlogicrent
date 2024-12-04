import React, { useState } from 'react';
import { Grid, Typography, Card, CardHeader, Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'categoryID', headerName: 'Category ID', width: 150 },
  { field: 'key', headerName: 'Key', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    sortable: false,
    renderCell: () => (
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    ),
  },
];

const IndexPage = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Item 1',
      categoryID: 'Category 1',
      key: 'Key 1'
    },
    {
      id: 2,
      name: 'Item 2',
      categoryID: 'Category 2',
      key: 'Key 2'
    },
    {
      id: 3,
      name: 'Item 3',
      categoryID: 'Category 3',
      key: 'Key 3'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');


  const filteredItems = items.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoryID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.key.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Grid container spacing={2} className='match-height'>
      <Grid item xs={12}>
        <Typography variant='h5'>Items</Typography>
        <Card>
          <CardHeader title='Items' />
          <Box sx={{ height: 500 }}>
            <DataGrid
              rows={filteredItems}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default IndexPage;
