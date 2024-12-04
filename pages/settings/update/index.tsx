import React, { useState } from 'react';
import { Grid, Typography, TextField, Button } from '@mui/material';

const EditItemPage = () => {
  const [name, setName] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [key, setKey] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoryIDChange = (event) => {
    setCategoryID(event.target.value);
  };

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>Edit Item</Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label='Name'
                value={name}
                onChange={handleNameChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Category ID'
                value={categoryID}
                onChange={handleCategoryIDChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Key'
                value={key}
                onChange={handleKeyChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='primary'>
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditItemPage;
