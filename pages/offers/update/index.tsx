// UpdateOffer.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const UpdateOffer = ({ offerId }) => {
  const [offer, setOffer] = useState({
    car: '',
    offerAmount: '',
    bannerDescription: '',
    bannerImage: null,
  });

  useEffect(() => {
    // Fetch the offer details when the component mounts
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`/api/offers/${offerId}`);
        setOffer(response.data);
      } catch (error) {
        console.error('Failed to fetch offer:', error);
      }
    };

    fetchOffer();
  }, [offerId]);

  const handleChange = (event) => {
    setOffer({
     ...offer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/offers/${offerId}`, offer);
      alert('Offer updated successfully');
    } catch (error) {
      console.error('Failed to update offer:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Update Offer</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Car"
          name="car"
          value={offer.car}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Offer Amount"
          name="offerAmount"
          value={offer.offerAmount}
          onChange={handleChange}
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Banner Description"
          name="bannerDescription"
          value={offer.bannerDescription}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        {/* Assuming you have a way to handle file uploads */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Offer
        </Button>
      </form>
    </div>
  );
};

export default UpdateOffer;
