import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DataGrid, GridColumns, GridEventListener } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Grid, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ServerSideToolbar from './ServerSideToolbar';


const bannerTable = () => {
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
    // { field: 'name', headerName: 'Name', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'promoCode', headerName: 'Promo Code', width: 150 },
    { field: 'discountPercentage', headerName: 'Discount Percentage', width: 150 },
    // { field: 'exprirationDate', headerName: 'Expiration Date', width: 150 },
    { field: 'terms', headerName: 'Terms', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleView(params.row._id)}>
            <VisibilityIcon />
          </IconButton>
          {/* <IconButton color="primary" onClick={() => handleEdit(params.row._id)}>
            <EditIcon />
          </IconButton> */}
          <IconButton color="secondary" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  function loadServerRows(currentPage: number, data: any[]) {
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  }

  const fetchTableData = useCallback(
    async (sort: string, q: string, column: string) => {
      await axios
        .get(`${process.env.SERVER_URL}api/v1/admin/getAllpromotions`, {
          params: {
            q,
            sort,
            column,
          },
        })
        .then((res) => {
          setTotal(res.data.total);
          setRows(loadServerRows(page, res.data.data));
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

  const handleEvent: GridEventListener<'rowClick'> = (params, event, details) => {
  };

  const handleDoubleClick: GridEventListener<'rowDoubleClick'> = (params, event, details) => {
    Router.push(`/promotion/update/${params.row._id}`);
  };

  const handleView = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.SERVER_URL}api/v1/admin/getPromotionsById/${id}`);
      setSelectedRow(response.data.data);
      setOpen(true);
    } catch (error) {
      console.error('There was an error fetching the banner details!', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    Router.push(`/promotion/update/${id}`);
  };

  const handleDelete = async (id: string) => {

    if (window.confirm('Are you sure you want to delete this Promotion banner?')) {
      await axios.delete(`${process.env.SERVER_URL}api/v1/admin/deletePromotionById/${id}`);
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
        <DialogTitle>banner Details</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : (
            selectedRow && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Basic Details
                  </Typography>
                </Grid>
                <Grid item xs={12} >
                  <img
                    src={selectedRow.bannerImage || '/defaultbannerImage.jpg'}
                    alt={`${selectedRow.name} ${selectedRow.type}`}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
                  />                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Name:</strong> {selectedRow?.name} </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Type:</strong> {selectedRow.type}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Promo Code:</strong> {selectedRow.promoCode}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Discount Percentage:</strong> {selectedRow.discountPercentage}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Expiration Date:</strong> {selectedRow.expirationDate}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Terms:</strong> {selectedRow.terms}</Typography>
                </Grid>

              </Grid>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default bannerTable;
