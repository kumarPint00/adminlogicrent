// ** React Imports
import { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';


// ** MUI Imports
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import { AccordionDetails, Avatar } from '@mui/material';

// ** Icons Imports
import ChevronDown from 'mdi-material-ui/ChevronDown';

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css';

// Styled component for the Box wrappers in Delivery Options' accordion

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Promotion } from '../../../../lib/PromotionProp';

const PromotionUpdate = () => {
  const router = useRouter();
  const PromotionId = router.query._id;
  const { register, handleSubmit, setValue, formState: { errors }, control, reset } = useForm<Promotion>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const [preview, setPreview] = useState(null);
  const hiddenInputRef = useRef();

  const fetchPromotionDetails = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}api/v1/admin/getPromotionById/${PromotionId}`);
      const PromotionData = response.data.data;
      Object.keys(PromotionData).forEach(key => {
     
        // Handle non-nested fields
        setValue(key as keyof Promotion, PromotionData[key]);

      });
      setPreview(PromotionData.bannerImage); // Assuming PromotionImages contains a single image URL
    } catch (error) {
      console.error('Error fetching Promotion details:', error);
    }
  };

  useEffect(() => {
    fetchPromotionDetails()
  }, [PromotionId, setValue])

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }



  const handleImageUpload = (event) => {
    const file = event.target.files;
    const urlImage = URL.createObjectURL(file[0]);
    if (file) {
      setPreview(urlImage);
      setImagePreviewUrl(file[0]);
    } else {
      setImagePreviewUrl('');
    }
  };

  const onUpload = () => {
    hiddenInputRef.current.click()
  }

  const uploadButtonLabel = preview ? 'Change image' : 'Upload image'


  const onSubmit = async (data: Promotion) => {  
    try {
      const formData = new FormData();
      
      // Append each field to the form data
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        } else {
          formData.append(key, value as string | Blob);
        }
      });
  
  
      if (imagePreviewUrl) {
        formData.append('bannerImage', imagePreviewUrl);
      }
  
      
      const response = await axios.put(`${process.env.SERVER_URL}api/v1/admin/updatePromotion/${PromotionId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (!response) {
        throw new Error('No response from server');
      }
  
  
      toast.success('Promotion updated successfully!', {
        position: 'bottom-right',
      });
      Router.push('/promotion/view');
  
    } catch (error) {
      console.error('Error:', error);
  
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
  
      toast.error('Error updating Promotion. Please try again.', {
        position: 'bottom-right',
      });
    }
  };
  




  const [expanded, setExpanded] = useState('panel1')


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={<ChevronDown />}
        id='form-layouts-collapsible-header-1'
        aria-controls='form-layouts-collapsible-content-1'
      >
        <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
          Promotion Details
        </Typography>
      </AccordionSummary>
      <Divider sx={{ m: 0 }} />
      <AccordionDetails>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Name' placeholder='Name' {...register('name')} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Type' placeholder='Type' {...register('type')} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Promo Code' placeholder='Promo Code' {...register('promoCode')} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Discount Percentage' placeholder='Discount Percentage' {...register('discountPercentage')} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Expiration Date' placeholder='Expiration Date' {...register('expirationDate')} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Terms' placeholder='Terms' {...register('terms')} />
          </Grid>
        </Grid>
      </AccordionDetails>
      <Divider sx={{ m: 0 }} />
    </Accordion>

    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
      <AccordionSummary
        expandIcon={<ChevronDown />}
        id='form-layouts-collapsible-header-2'
        aria-controls='form-layouts-collapsible-content-2'
      >
        <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
          Add Images
        </Typography>
      </AccordionSummary>
      <Divider sx={{ m: 0 }} />
      <AccordionDetails>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            {preview ? (
              <img src={preview} style={{ width: '200px', height: '200px' }} alt='preview' />
            ) : (
              <>
                <Avatar alt='Offer Image' src={preview} sx={{ width: 200, height: 200, mb: 2 }} variant='rounded' />
                <Typography>Preview</Typography>
              </>
            )}
          </Grid>
          <Grid item xs={6}>
            <Button variant='contained' color='primary' onClick={onUpload}>
              {uploadButtonLabel}
            </Button>
            <input
              type='file'
              name='bannerImage'
              style={{ display: 'none' }}
              onChange={handleImageUpload}
              ref={hiddenInputRef}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>

    <AccordionDetails>
      <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
        Add Promotion
      </Button>
      <Button size='large' variant='outlined'>
        Cancel
      </Button>
    </AccordionDetails>
  </form>
  )
}

export default PromotionUpdate
