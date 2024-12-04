import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography } from '@mui/material';

const columns: GridColumns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'carName', headerName: 'Car Name', width: 150 },
  { field: 'startDate', headerName: 'Start Date', width: 150 },
  { field: 'isNewEnquiry', headerName: 'New Enquiry', width: 150 },
  { field: 'endDate', headerName: 'End Date', width: 150 },
  { field: 'pickUpLoc', headerName: 'Pick Up Location', width: 200 },
  { field: 'dropLocation', headerName: 'Drop Location', width: 200 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
  { field: 'area', headerName: 'Area', width: 150 },
  { field: 'message', headerName: 'Message', width: 200 },
  { field: 'deliveryMode', headerName: 'Delivery Mode', width: 150 },
  { field: 'city', headerName: 'City', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'packages', headerName: 'Packages', width: 150 },
  { field: 'brand', headerName: 'Brand', width: 150 },
  { field: 'model', headerName: 'Model', width: 150 },
  { field: 'enquiryType', headerName: 'Enquiry Type', width: 150 },
  { field: 'preferredContact', headerName: 'Preferred Contact', width: 150 },
  { field: 'budget', headerName: 'Budget', width: 150 },
  { field: 'additionalRequirements', headerName: 'Additional Requirements', width: 200 },
  { field: 'source', headerName: 'Source', width: 150 },
  { field: 'promotionalCode', headerName: 'Promotional Code', width: 150 },
  { field: 'preferredLanguage', headerName: 'Preferred Language', width: 150 },
  { field: 'currentEnquiryStatus', headerName: 'Current Enquiry Status', width: 200 },
  { field: 'enquiryStatus', headerName: 'Enquiry Status', width: 150 },
  { field: 'bookingCreated', headerName: 'Booking Created', width: 200 },
  { field: 'bookingUpdated', headerName: 'Booking Updated', width: 200 },
];

const EnquiryTable = () => {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState<number>(0);
  const [sort, setSort] = useState('asc');
  const [pageSize, setPageSize] = useState(7);
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  function loadServerRows(currentPage: number, data: any[]) {
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  }

  const fetchTableData = useCallback(
    async (sort: string, q: string, column: string) => {
      try {
        const response = await axios.get(`${process.env.SERVER_URL}api/v1/user/getAllRejectedEnquiries`, {
          params: {
            q,
            sort,
            column,
          },
        });
        setTotal(response.data.total);
        setRows(loadServerRows(page, response.data.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    [page, pageSize]
  );

  useEffect(() => {
    fetchTableData(sort, searchValue, sortColumn);
  }, [fetchTableData, searchValue, sort, sortColumn]);

  const handleSortModel = (newModel: any) => {
    if (newModel.length) {
      setSort(newModel[0].sort);
      setSortColumn(newModel[0].field);
      fetchTableData(newModel[0].sort, searchValue, newModel[0].field);
    } else {
      setSort('asc');
      setSortColumn('name');
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    fetchTableData(sort, value, sortColumn);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const handleEnquiryStatusChange = async (status) => {
    if (selectedRow) {
      const updatedEnquiry = {
        ...selectedRow,
        currentEnquiryStatus: status === 'Accepted' ? 'Accepted' : 'Rejected',
        enquiryStatus: status === 'Accepted',
      };
      
      try {
        await axios.put(`${proccess.env.SERVER_URL}api/v1/user/updateEnquiry/${selectedRow._id}`, updatedEnquiry);


        fetchTableData(sort, searchValue, sortColumn);
        handleDialogClose();
      } catch (error) {
        console.error('Error updating enquiry:', error);
      }
    }
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        sortingMode="server"
        paginationMode="server"
        onSortModelChange={handleSortModel}
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageChange={(newPage) => setPage(newPage)}
        components={{ Toolbar: ServerSideToolbar }}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowId={(row) => row._id}
        componentsProps={{
          toolbar: {
            value: searchValue,
            clearSearch: () => handleSearch(''),
            onChange: (event: any) => handleSearch(event.target.value),
          },
        }}
        onRowClick={handleRowClick}
      />
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Enquiry Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Name:</strong> {selectedRow.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Car Name:</strong> {selectedRow.carName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Start Date:</strong> {new Date(selectedRow.startDate).toLocaleDateString()}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>End Date:</strong> {new Date(selectedRow.endDate).toLocaleDateString()}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Pick Up Location:</strong> {selectedRow.pickUpLoc}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Drop Location:</strong> {selectedRow.dropLocation}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Phone Number:</strong> {selectedRow.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Email:</strong> {selectedRow.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Area:</strong> {selectedRow.area}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Message:</strong> {selectedRow.message}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Delivery Mode:</strong> {selectedRow.deliveryMode}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>City:</strong> {selectedRow.city}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Packages:</strong> {selectedRow.packages}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Brand:</strong> {selectedRow.brand}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Model:</strong> {selectedRow.model}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Enquiry Type:</strong> {selectedRow.enquiryType}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Preferred Contact:</strong> {selectedRow.preferredContact}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Budget:</strong> {selectedRow.budget}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Additional Requirements:</strong> {selectedRow.additionalRequirements}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Source:</strong> {selectedRow.source}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Promotional Code:</strong> {selectedRow.promotionalCode}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Preferred Language:</strong> {selectedRow.preferredLanguage}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Current Enquiry Status:</strong> {selectedRow.currentEnquiryStatus}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Enquiry Status:</strong> {selectedRow.enquiryStatus ? 'Active' : 'Inactive'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Booking Created:</strong> {new Date(selectedRow.bookingCreated).toLocaleDateString()}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Booking Updated:</strong> {new Date(selectedRow.bookingUpdated).toLocaleDateString()}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={() => handleEnquiryStatusChange('Accepted')} color="primary">
            Accept
          </Button>
          <Button onClick={() => handleEnquiryStatusChange('Rejected')} color="secondary">
            Reject
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
};

export default EnquiryTable;
