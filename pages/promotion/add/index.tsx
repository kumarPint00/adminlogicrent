import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Grid, Button, Divider, Accordion, TextField, Typography, AccordionSummary, AccordionDetails, Avatar } from '@mui/material';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import { Promotion } from '../../../lib/PromotionProp';

const PromotionAddition: React.FC = () => {
  const { register, handleSubmit } = useForm<Promotion>();
  const router = useRouter();

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const urlImage = URL.createObjectURL(file);
      setPreview(urlImage);
      setImagePreviewUrl(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const onUpload = () => {
    hiddenInputRef.current?.click();
  };

  const uploadButtonLabel = preview ? 'Change image' : 'Upload image';

  const onSubmit = async (data: Promotion) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== 'image') {
          formData.append(key, data[key as keyof Promotion]);
        }
      });
      if (imagePreviewUrl) {
        formData.append('bannerImage', imagePreviewUrl);
      }

      const response = await axios.post(
        `${process.env.SERVER_URL}api/v1/admin/createPromotions`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (!response) {
        throw new Error('No response from server');
      }

      toast.success('Promotion created successfully!', {
        position: 'bottom-right',
      });
      router.push('/promotion/view');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error creating Promotion. Please try again.', {
        position: 'bottom-right',
      });
    }
  };

  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

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
  );
};

export default PromotionAddition;
