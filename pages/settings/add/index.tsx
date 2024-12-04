import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, TextField, Typography, Button } from '@mui/material';
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { useForm } from 'react-hook-form';

const VariantAddition = () => {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    try {
      // Handle form submission logic here
      // Make POST request to API endpoint with form data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Set default values for prices
  React.useEffect(() => {
    setValue('prices.amountIND', 80);
    setValue('prices.amountUK', 80);
    setValue('prices.amountCAD', 80);
    setValue('prices.amountAUD', 80);
    setValue('prices.amountUAED', 80);
    setValue('prices.amountEURO', 80);
    setValue('prices.amountYEN', 80);
    setValue('prices.amountWON', 65);
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ChevronDown />}
          aria-controls='variant-sizes-panel-content'
          id='variant-sizes-panel-header'
        >
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
            Variant Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label='Price' placeholder='Price' {...register('prices.amountIND')} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label='Size Id' placeholder='Size Id' {...register('variantSizes[0].sizeId')} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label='Quantity' placeholder='Quantity' {...register('variantSizes[0].quantity')} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Additional fields for prices */}
      <input type='hidden' {...register('prices.amountUK')} />
      <input type='hidden' {...register('prices.amountCAD')} />
      <input type='hidden' {...register('prices.amountAUD')} />
      <input type='hidden' {...register('prices.amountUAED')} />
      <input type='hidden' {...register('prices.amountEURO')} />
      <input type='hidden' {...register('prices.amountYEN')} />
      <input type='hidden' {...register('prices.amountWON')} />

      <Button type='submit' variant='contained' sx={{ mt: 2 }}>
        Add Variant
      </Button>
    </form>
  );
};

export default VariantAddition;
