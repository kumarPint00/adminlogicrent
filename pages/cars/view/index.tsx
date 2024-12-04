import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DataGrid, GridColumns, GridEventListener } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import {
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress,
  Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Switch
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ServerSideToolbar from './ServerSideToolbar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    margin: '20px 0',
    boxShadow: theme.shadows[3],
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  tableTitle: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  imageContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  sectionTitle: {
    fontWeight: 'bold',
    margin: '20px 0',
    fontSize: '1.5rem',
    textAlign: 'center',
  }
}));

const CarTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState<number>(0);
  const Router = useRouter();
  const [sort, setSort] = useState('asc');
  const [pageSize, setPageSize] = useState(7);
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns: GridColumns = [
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'model', headerName: 'Model', width: 150 },
    { field: 'year', headerName: 'Year', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 150 },
    { field: 'featuredCar', headerName: 'Featured Car', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'activebutton',
      headerName: 'Active',
      width: 150,
      renderCell: (params) => (
        <Switch
          checked={params.row.status === 'active'}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => {
            event.stopPropagation(); // Prevents propagation issues
            handleToggleStatus(params.row._id, params.row.status);
          }}
          color="primary"
        />
      ),
    },    
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleView(params.row._id)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleEdit(params.row._id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
   
  ];
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await axios.put(
        `${process.env.SERVER_URL}api/v1/admin/updateCarStatus/${id}`,
        { status: newStatus }
      );
  
      setRows((prevRows) =>
        prevRows.map((row) =>
          row._id === id ? { ...row, status: newStatus } : row
        )
      );
    } catch (error) {
      console.error('Error updating status', error);
    }
  };
  
  const fetchTableData = useCallback(
    async (sort: string, q: string, column: string) => {
      await axios
        .get(`${process.env.SERVER_URL}api/v1/admin/getAllCars`, {
          params: { q, sort, column },
        })
        .then((res) => {
          setTotal(res.data.total);
          setRows(res.data.data);
        });
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

  const handleView = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.SERVER_URL}api/v1/admin/getCarById/${id}`);
      setSelectedRow(response.data.data);
      setOpen(true);
    } catch (error) {
      console.error('There was an error fetching the car details!', error);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (id: string) => {
    Router.push(`/cars/update/${id}`);
  };

  console.log({selectedRow})

  const handleDelete = async (id: string) => {
    
    if (window.confirm('Are you sure you want to delete this car?')) {
      await axios.delete(`${process.env.SERVER_URL}api/v1/admin/deleteCarById/${id}`);
      fetchTableData(sort, searchValue, sortColumn);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows.map((row) => ({ ...row, id: row._id }))}
        columns={columns}
        pageSize={pageSize}
        sortingMode="server"
        paginationMode="server"
        onSortModelChange={handleSortModel}
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageChange={(newPage) => setPage(newPage)}
        components={{ Toolbar: ServerSideToolbar }}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        componentsProps={{
          toolbar: {
            value: searchValue,
            clearSearch: () => handleSearch(''),
            onChange: (event: any) => handleSearch(event.target.value),
          },
        }}
      />
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Car Details</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : (
            selectedRow && (
              <>
                <div className={classes.imageContainer}>
                  <img
                    src={selectedRow.carImages?.imageUrl || '/defaultCarImage.jpg'}
                    alt={`${selectedRow.brand} ${selectedRow.model}`}
                    className={classes.image}
                  />
                </div>

                {/* Basic Details */}
                <Typography className={classes.sectionTitle}>Basic Details</Typography>
                <Typography>Car Status: {selectedRow.status}</Typography>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>Brand:</strong></TableCell>
                        <TableCell>{selectedRow.brand}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Model:</strong></TableCell>
                        <TableCell>{selectedRow.model}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Year:</strong></TableCell>
                        <TableCell>{selectedRow.year}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Colour:</strong></TableCell>
                        <TableCell>{selectedRow.colour}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Interior Color:</strong></TableCell>
                        <TableCell>{selectedRow.interiorColor}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Location:</strong></TableCell>
                        <TableCell>{selectedRow.location}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Vehicle Type:</strong></TableCell>
                        <TableCell>{selectedRow.vehicleType}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Insurance Details */}
                <Typography className={classes.sectionTitle}>Insurance Details</Typography>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>Standard Insurance Price:</strong></TableCell>
                        <TableCell>{selectedRow.sIprice}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Full Insurance Price:</strong></TableCell>
                        <TableCell>{selectedRow.fIprice}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Car Features */}
                <Typography className={classes.sectionTitle}>Car Features</Typography>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>Transmission:</strong></TableCell>
                        <TableCell>{selectedRow.carFeatures?.transmission}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Cruise Control:</strong></TableCell>
                        <TableCell>{selectedRow.carFeatures?.cruiseControl ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Engine Capacity:</strong></TableCell>
                        <TableCell>{selectedRow.carFeatures?.engineCapacity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Bluetooth:</strong></TableCell>
                        <TableCell>{selectedRow.carFeatures?.bluetooth ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Seats:</strong></TableCell>
                        <TableCell>{selectedRow.carFeatures?.seater}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Package Details */}
                <Typography className={classes.sectionTitle}>Package Details</Typography>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>Security Deposit:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.securityDeposit}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Daily Price:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.dprice}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Daily Free KMs:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.dnumOFFreeKMs}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Daily Price After Free KMs:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.dpriceAfterFreeKMs}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Daily Free Cancellation:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.dfreeCancellation ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Daily Delivery Charges:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.ddeliveryCharges}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Minimum Rental Days:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.dminimumDays}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Weekly Price:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.wprice}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Weekly Free KMs:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.wnumOFFreeKMs}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Weekly Price After Free KMs:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.wpriceAfterFreeKMs}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Weekly Free Cancellation:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.wfreeCancellation ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Weekly Delivery Charges:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.wdeliveryCharges}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Price (1 Month):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m1price}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Free KMs (1 Month):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m1numOFFreeKMs}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Price After Free KMs (1 Month):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m1priceAfterFreeKMs}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Free Cancellation (1 Month):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m1freeCancellation ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Delivery Charges (1 Month):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m1deliveryCharges}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Price (3 Months):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m3price}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Free KMs (3 Months):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m3numOFFreeKMs}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Free Cancellation (3 Months):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m3freeCancellation ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Price (6 Months):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m6price}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Free KMs (6 Months):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m6numOFFreeKMs}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Free Cancellation (6 Months):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m6freeCancellation ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Price (9 Months):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m9price}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Free KMs (9 Months):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m9numOFFreeKMs}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Monthly Free Cancellation (9 Months):</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.m9freeCancellation ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Extra Mileage Cost:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.extraMileageCost}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>CDW Insurance Per Day:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.cdwInsurancePerDay}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Delivery and Pickup Charges:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.deliveryAndPickUpCharges}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Special Notes:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.specialNoteForCustomers}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Payment Methods:</strong></TableCell>
                        <TableCell>{selectedRow.packageDetails?.paymentMethods}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

              </>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarTable;
