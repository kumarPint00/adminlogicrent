import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    padding: theme.spacing(2),
  },
  fieldGroup: {
    marginBottom: theme.spacing(2),
  },
  fieldLabel: {
    fontWeight: 'bold',
  },
  fieldValue: {
    marginLeft: theme.spacing(1),
  },
  dialogActions: {
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  rejectButton: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  confirmDialogTitle: {
    textAlign: 'center',
  },
  confirmDialogContent: {
    textAlign: 'center',
  },
  confirmDialogActions: {
    justifyContent: 'center',
  },
}));

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'carName', headerName: 'Car Name', width: 150 },
  { field: 'startDate', headerName: 'Start Date', width: 150 },
  { field: 'pickUpLoc', headerName: 'Pick Up Location', width: 200 },
  { field: 'dropLocation', headerName: 'Drop Location', width: 200 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
];

const EnquiryTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState<number>(0);
  const [sort, setSort] = useState('asc');
  const [pageSize, setPageSize] = useState(7);
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const fetchTableData = useCallback(
    async (sort: string, q: string, column: string) => {
      try {
        const response = await axios.get(
          `${process.env.SERVER_URL}api/v1/user/getAllEnquiries`,
          {
            params: {
              q,
              sort,
              column,
              page,
              pageSize,
            },
          }
        );
        setTotal(response.data.total);
        setRows(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    [page, pageSize, sort, searchValue, sortColumn]
  );

  useEffect(() => {
    fetchTableData(sort, searchValue, sortColumn);
  }, [fetchTableData, searchValue, sort, sortColumn, page, pageSize]);

  const handleSortModel = (newModel: any) => {
    if (newModel.length) {
      setSort(newModel[0].sort);
      setSortColumn(newModel[0].field);
    } else {
      setSort('asc');
      setSortColumn('name');
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
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
    if (selectedRow && selectedRow._id) {
      const updatedEnquiry = {
        ...selectedRow,
        currentEnquiryStatus: status === 'Accepted' ? 'Accepted' : 'Rejected',
        enquiryStatus: status === 'Accepted',
      };

      try {
        await axios.put(
          `${process.env.SERVER_URL}api/v1/user/updateEnquiry/${selectedRow._id}`,
          updatedEnquiry
        );

        fetchTableData(sort, searchValue, sortColumn);
        handleDialogClose();
      } catch (error) {
        console.error('Error updating enquiry:', error);
      }
    }
  };

  const handleDelete = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedRow && selectedRow._id) {
      try {
        await axios.delete(
          `${process.env.SERVER_URL}api/v1/user/deleteEnquiryById/${selectedRow._id}`
        );
        fetchTableData(sort, searchValue, sortColumn);
        handleDialogClose();
      } catch (error) {
        console.error('Error deleting enquiry:', error);
      } finally {
        setOpenConfirmDialog(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowCount={total}
        pagination
        paginationMode="server"
        sortingMode="server"
        onSortModelChange={handleSortModel}
        rowsPerPageOptions={[7, 10, 25, 50]}
        page={page}
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
        <DialogContent className={classes.dialogContent}>
          {selectedRow && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Name:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.name || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Car Name:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.carName || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Start Date:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.startDate
                    ? new Date(selectedRow.startDate).toLocaleDateString()
                    : 'N/A'}
                </Typography>
              </Grid>
              {/* Continue adding other fields with null checks */}
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>End Date:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.endDate
                    ? new Date(selectedRow.endDate).toLocaleDateString()
                    : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Pick Up Location:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.pickUpLoc || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Drop Location:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.dropLocation || 'N/A'}
                </Typography>
              </Grid>
              {/* ... Add all other fields similarly */}
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Phone Number:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.phoneNumber || 'N/A'}
                </Typography>
              </Grid>
              {/* Ensure you include all fields from your original code */}
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Email:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.email || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Notes:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.notes || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Promo Code:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.promoCode || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Package:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.packageType || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Subsciption Length:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.subscriptionLength || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Subsciption Length:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.subscriptionLength || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Subsciption Length:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.insuranceType || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Subsciption Length:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.preferContact || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Subsciption Length:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.additionalServices || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fieldGroup}>
                <Typography className={classes.fieldLabel}>Subsciption Length:</Typography>
                <Typography className={classes.fieldValue}>
                  {selectedRow.totalPrice || 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <div>
            <Button
              onClick={() => handleEnquiryStatusChange('Accepted')}
              className={classes.acceptButton}
            >
              Accept
            </Button>
            <Button
              onClick={() => handleEnquiryStatusChange('Rejected')}
              className={classes.rejectButton}
            >
              Reject
            </Button>
          </div>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle className={classes.confirmDialogTitle}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent className={classes.confirmDialogContent}>
          <Typography>Are you sure you want to delete this enquiry?</Typography>
        </DialogContent>
        <DialogActions className={classes.confirmDialogActions}>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EnquiryTable;
