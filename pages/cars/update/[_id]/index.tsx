// ** React Imports
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';

import { useFetch } from "@uidotdev/usehooks";

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Accordion from '@mui/material/Accordion'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import { AccordionDetails, InputLabel, Select, MenuItem, Box, Checkbox, FormControlLabel, Avatar } from '@mui/material'
import { brandsAndModels, colors } from 'src/lib/brandAmodels'

// ** Icons Imports
import ChevronDown from 'mdi-material-ui/ChevronDown'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// Styled component for the Box wrappers in Delivery Options' accordion

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
import { FormControl } from '@mui/material'
import { Car, defaultCarValues } from 'src/lib/CarProps';

const CarUpdate = () => {
  const router = useRouter();
  const carId = router.query._id;

  const [carDetails, setCarDetails] = useState({ ...defaultCarValues });
  const [formData, setFormData] = useState<Car>();

  const { register, handleSubmit, setValue, formState: { errors }, control, reset } = useForm<Car>({ defaultValues: carDetails });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedColorInterior, setSelectedColorInterior] = useState('');
  const [selectedColorExterior, setSelectedColorExterior] = useState('');
  const [preview, setPreview] = useState(null);
  const hiddenInputRef = useRef();

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}api/v1/admin/getCarById/${carId}`);
      const carData = response.data.data;
      Object.keys(carData).forEach(key => {
        if (key === 'packageDetails') {
          Object.keys(carData[key]).forEach(nestedKey => {
            const nestedValue = carData[key][nestedKey];
            setValue(`${nestedKey}` as keyof Car, nestedValue);
          });
        }
        if (key === 'carFeatures') {
          Object.keys(carData[key]).forEach(nestedKey => {
            const nestedValue = carData[key][nestedKey];
            setValue(`${nestedKey}` as keyof Car, nestedValue);
          });
        }

        if (key === 'carImages') {
          Object.keys(carData[key]).forEach(nestedKey => {
            const nestedValue = carData[key][nestedKey];
            setValue(`${nestedKey}` as keyof Car, nestedValue);
          });
        }

        // Handle non-nested fields
        setValue(key as keyof Car, carData[key]);

      });
      setSelectedBrand(carData.brand);
      setSelectedModel(carData.model);
      setSelectedVersion(carData.version);
      setSelectedYear(carData.year);
      setImagePreviewUrl(carData.carImages.imageUrl); // Assuming carImages contains a single image URL
      setPreview(carData.carImages.imageUrl); // Assuming carImages contains a single image URL
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  useEffect(() => {
    fetchCarDetails()
  }, [carId, setValue])

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


  const onSubmit = async (data: Car) => {  
    try {
      const formData = new FormData();
      
      // Append each field to the form data
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
          // Handle nested objects (e.g., carFeatures and packageDetails)
          // Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          //   formData.append(`${key}.${nestedKey}`, nestedValue as string | Blob);
          // });
        } else {
          formData.append(key, value as string | Blob);
        }
      });
  
  
      if (imagePreviewUrl) {
        formData.append('carImages', imagePreviewUrl);
      }
  
      // // Debug: Log the formData to verify fields
      // for (let [key, value] of formData.entries()) {
      // }
      
      const response = await axios.put(`${process.env.SERVER_URL}api/v1/admin/updateCarById/${carId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (!response) {
        throw new Error('No response from server');
      }
  
  
      toast.success('Car updated successfully!', {
        position: 'bottom-right',
      });
      Router.push('/cars/view');
  
    } catch (error) {
      console.error('Error:', error);
  
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
  
      toast.error('Error updating car. Please try again.', {
        position: 'bottom-right',
      });
    }
  };
  




  const [expanded, setExpanded] = useState('panel1')



  const filteredModels = brandsAndModels.find(brand => brand.brand === selectedBrand)?.models.map(model => model.name) || [];

  const selectedModelObject = brandsAndModels.find(brand => brand.brand === selectedBrand)?.models.find(model => model.name === selectedModel);

  const versions = selectedModelObject?.versions || [];

  const years = Array.from({ length: 50 }, (_, i) => 2023 - i) // Generates years from 2023 to 1973

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ChevronDown />}
          id='form-layouts-collapsible-header-1'
          aria-controls='form-layouts-collapsible-content-1'
        >
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
            SELECT CAR
          </Typography>
        </AccordionSummary>
        <Divider sx={{ m: 0 }} />
        <AccordionDetails>
          <Grid container spacing={5}>

            <Grid item xs={6} sm={4}>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="brand-label">Brand</InputLabel>
                    <Select
                      labelId="brand-label"
                      id="brand-select"
                      label="Brand"
                      {...field}
                      // value={selectedBrand}
                      onChange={(e) => {
                        setSelectedBrand(e.target.value);
                        field.onChange(e);
                      }}
                    >
                      <MenuItem value="">Select Brand</MenuItem>
                      {brandsAndModels.map((brandData) => (
                        <MenuItem key={brandData.brand} value={brandData.brand}>{brandData.brand}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />

            </Grid>
            <Grid item xs={6} sm={4}>
              <Controller
                name="model"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="model-label">Model</InputLabel>
                    <Select
                      labelId="model-label"
                      id="model-select"
                      {...field}
                      value={selectedModel}
                      label="model"
                      onChange={(e) => {
                        setSelectedModel(e.target.value);
                        field.onChange(e);
                      }}

                    >
                      <MenuItem value="">Select model</MenuItem>
                      {filteredModels.map((model) => (
                        <MenuItem key={model} value={model}>
                          {model}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />

            </Grid>
            {/* <Grid item xs={6} sm={3}>
              <Controller
                name="version"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="version-label">Version</InputLabel>
                    <Select
                      labelId="version-label"
                      id="version-select"
                      {...field}
                      value={selectedVersion}
                      label="version"
                      onChange={(e) => {
                        setSelectedVersion(e.target.value);
                        field.onChange(e);
                      }}
                    >

                      <MenuItem value="">Select version</MenuItem>
                      {versions.map((version) => (
                        <MenuItem key={version} value={version}>
                          {version}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )} />
            </Grid> */}
            <Grid item xs={6} sm={4}>
              <Controller
                name='year'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="year-label">Year</InputLabel>
                    <Select
                      labelId="year-label"
                      id="year-select"
                      {...field}
                      value={selectedYear}
                      label="year"
                      onChange={(e) => {
                        setSelectedYear(e.target.value);
                        field.onChange(e);
                      }}
                    >
                      <MenuItem value="">Select year</MenuItem>
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ChevronDown />}
          id='form-layouts-collapsible-header-2'
          aria-controls='form-layouts-collapsible-content-2'
        >
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
            CAR SPECS
          </Typography>
        </AccordionSummary>
        <Divider sx={{ m: 0 }} />
        <AccordionDetails>
          <Grid container spacing={5}>

            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Car category' InputLabelProps={{
                shrink: true,
              }} placeholder='Car category' {...register('category')} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Car Location' InputLabelProps={{
                shrink: true,
              }} placeholder='Car Location' {...register('location')} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Car Type' InputLabelProps={{
                shrink: true,
              }} placeholder='Car Type' {...register('vehicleType')} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Car status' InputLabelProps={{
                shrink: true,
              }} placeholder='Car status' {...register('status')} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Car services' InputLabelProps={{
                shrink: true,
              }} placeholder='Car services' {...register('services')} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Transmission' InputLabelProps={{
                shrink: true,
              }} placeholder='Transmission' {...register('transmission')} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Fuel Type' InputLabelProps={{
                shrink: true,
              }} placeholder='Fuel Type' {...register('FuelType')} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Engine Capacity' InputLabelProps={{
                shrink: true,
              }} placeholder='Engine Capacity' {...register('engineCapacity')} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Boot Capacity' InputLabelProps={{
                shrink: true,
              }} placeholder='Boot Capacity' {...register('luggageBootCapacity')} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Engine Size' InputLabelProps={{
                shrink: true,
              }} placeholder='Engine Size' {...register('engineSize')} />
            </Grid>


            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Seater' InputLabelProps={{
                shrink: true,
              }} placeholder='Seater' {...register('seater')} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Vehicle Type' InputLabelProps={{
                shrink: true,
              }} placeholder='Vehicle Type' {...register('vehicleType')} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="gccSpecs"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="GCC Specs"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="cruiseControl"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Cruise Control"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="bluetooth"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Bluetooth"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="aux"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Aux"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="navigation"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Navigation"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="parkSense"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Park Sense"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="appleCarPlay"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Apple CarPlay"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="isoFix"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="IsoFix"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="sunRoof"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Sun Roof"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="pushButton"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Push Button"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="lcd"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="LCD"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="rearCamera"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Rear Camera"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField fullWidth label='Description' multiline InputLabelProps={{
                shrink: true,
              }} placeholder='Description' {...register('description')} />
            </Grid>
          </Grid>
        </AccordionDetails>
        <Divider sx={{ m: 0 }} />
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ChevronDown />}
          id='form-layouts-collapsible-header-2'
          aria-controls='form-layouts-collapsible-content-2'
        >
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
            CAR PRICING
          </Typography>
        </AccordionSummary>
        <Divider sx={{ m: 0 }} />
        <AccordionDetails>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ChevronDown />}
                  id='variant-sizes-collapsible-header'
                  aria-controls='variant-sizes-collapsible-content'
                >
                  <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                    Daily Charges
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Charge Per Day' InputLabelProps={{
                        shrink: true,
                      }} placeholder='Charge Per Day' {...register('dprice')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Allowed Number of KMs' InputLabelProps={{
                        shrink: true,
                      }} placeholder='allowedNumberOfKMs' {...register('dnumOFFreeKMs')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Delivery Charges' InputLabelProps={{
                        shrink: true,
                      }} placeholder='deliveryCharges' {...register('ddeliveryCharges')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Minimum Days' InputLabelProps={{
                        shrink: true,
                      }} placeholder='minimumDays' {...register('dminimumDays')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Charges after free KMs' InputLabelProps={{
                        shrink: true,
                      }} placeholder='chargesAfterFreeKMs' {...register('dpriceAfterFreeKMs')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="dfreeCancellation"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={<Checkbox {...field} checked={field.value} />}
                            label="Free Cancellation"
                          />
                        )}
                      />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Cancellation Charges' InputLabelProps={{
                        shrink: true,
                      }} placeholder='cancellationCharges' {...register('dcancellationCharge')} />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ChevronDown />}
                  id='variant-sizes-collapsible-header'
                  aria-controls='variant-sizes-collapsible-content'
                >
                  <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                    Weekly Charges
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Charge Per Week' InputLabelProps={{
                        shrink: true,
                      }} placeholder='chargePerWeek' {...register('wprice')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Allowed Number of KMs' InputLabelProps={{
                        shrink: true,
                      }} placeholder='allowedNumberOfKMs' {...register('wnumOFFreeKMs')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Delivery Charges' InputLabelProps={{
                        shrink: true,
                      }} placeholder='deliveryCharges' {...register('wdeliveryCharges')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Charges after free KMs' InputLabelProps={{
                        shrink: true,
                      }} placeholder='chargesAfterFreeKMs' {...register('wpriceAfterFreeKMs')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="wfreeCancellation"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={<Checkbox {...field} checked={field.value} />}
                            label="Free Cancellation"
                          />
                        )}
                      />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Cancellation Charges' InputLabelProps={{
                        shrink: true,
                      }} placeholder='cancellationCharges' {...register('wcancellationCharge')} />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

            </Grid>
            <Divider sx={{ m: 0 }} />
            <AccordionDetails>
              <Grid container spacing={5}>


                <Grid item xs={12} sm={6}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ChevronDown />}
                      id='variant-sizes-collapsible-header'
                      aria-controls='variant-sizes-collapsible-content'
                    >
                      <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                        1 Month Charge
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Charge Per Month' InputLabelProps={{
                            shrink: true,
                          }} placeholder='chargePerMonth' {...register('m1price')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Allowed Number of KMs' InputLabelProps={{
                            shrink: true,
                          }} placeholder='allowedNumberOfKMs' {...register('m1numOFFreeKMs')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Delivery Charges' InputLabelProps={{
                            shrink: true,
                          }} placeholder='deliveryCharges' {...register('m1deliveryCharges')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Charges after free KMs' InputLabelProps={{
                            shrink: true,
                          }} placeholder='m1priceAfterFreeKMs' {...register('m1priceAfterFreeKMs')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="m1freeCancellation"
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label="Free Cancellation"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Cancellation Charges' InputLabelProps={{
                            shrink: true,
                          }} placeholder='cancellationCharges' {...register('m1cancellationCharge')} />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>            </Grid>
                <Grid item xs={12} sm={6}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ChevronDown />}
                      id='variant-sizes-collapsible-header'
                      aria-controls='variant-sizes-collapsible-content'
                    >
                      <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                        3 Month Charge
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Charge Per Month' InputLabelProps={{
                            shrink: true,
                          }} placeholder='chargePerMonth' {...register('m3price')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Allowed Number of KMs' InputLabelProps={{
                            shrink: true,
                          }} placeholder='allowedNumberOfKMs' {...register('m3numOFFreeKMs')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Delivery Charges' InputLabelProps={{
                            shrink: true,
                          }} placeholder='deliveryCharges' {...register('m3deliveryCharges')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Charges after free KMs' InputLabelProps={{
                            shrink: true,
                          }} placeholder='m3priceAfterFreeKMs' {...register('m3priceAfterFreeKMs')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="m3freeCancellation"
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label="Free Cancellation"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Cancellation Charges' InputLabelProps={{
                            shrink: true,
                          }} placeholder='cancellationCharges' {...register('m3cancellationCharge')} />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>            </Grid>
                <Grid item xs={12} sm={6}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ChevronDown />}
                      id='variant-sizes-collapsible-header'
                      aria-controls='variant-sizes-collapsible-content'
                    >
                      <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                        6 Month Charge
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Charge Per Month' InputLabelProps={{
                            shrink: true,
                          }} placeholder='chargePerMonth' {...register('m6price')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Allowed Number of KMs' InputLabelProps={{
                            shrink: true,
                          }} placeholder='allowedNumberOfKMs' {...register('m6numOFFreeKMs')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Delivery Charges' InputLabelProps={{
                            shrink: true,
                          }} placeholder='deliveryCharges' {...register('m6deliveryCharges')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Charges after free KMs' InputLabelProps={{
                            shrink: true,
                          }} placeholder='m6priceAfterFreeKMs' {...register('m6priceAfterFreeKMs')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="m6freeCancellation"
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label="Free Cancellation"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Cancellation Charges' InputLabelProps={{
                            shrink: true,
                          }} placeholder='cancellationCharges' {...register('m6cancellationCharge')} />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>            </Grid>
                <Grid item xs={12} sm={6}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ChevronDown />}
                      id='variant-sizes-collapsible-header'
                      aria-controls='variant-sizes-collapsible-content'
                    >
                      <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                        9 Month Charge
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Charge Per Month' InputLabelProps={{
                            shrink: true,
                          }} placeholder='chargePerMonth' {...register('m9price')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Allowed Number of KMs' InputLabelProps={{
                            shrink: true,
                          }} placeholder='allowedNumberOfKMs' {...register('m9numOFFreeKMs')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Delivery Charges' InputLabelProps={{
                            shrink: true,
                          }} placeholder='deliveryCharges' {...register('m9deliveryCharges')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Charges after free KMs' InputLabelProps={{
                            shrink: true,
                          }} placeholder='m9priceAfterFreeKMs' {...register('m9priceAfterFreeKMs')} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="m9freeCancellation"
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label="Free Cancellation"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Cancellation Charges' InputLabelProps={{
                            shrink: true,
                          }} placeholder='cancellationCharges' {...register('m9cancellationCharge')} />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>            </Grid>
              </Grid>
            </AccordionDetails>
            <Grid item xs={12} sm={6}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ChevronDown />}
                  id='variant-sizes-collapsible-header'
                  aria-controls='variant-sizes-collapsible-content'
                >
                  <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                    Insurrance Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Standard Insurrance' InputLabelProps={{
                        shrink: true,
                      }} placeholder='standardInsurance' {...register('sIprice')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Full Insurrance' InputLabelProps={{
                        shrink: true,
                      }} placeholder='fullInsurance' {...register('fIprice')} />
                    </Grid>

                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </AccordionDetails>
        <Divider sx={{ m: 0 }} />
      </Accordion>


      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ChevronDown />}
          id='form-layouts-collapsible-header-2'
          aria-controls='form-layouts-collapsible-content-2'
        >
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
            RENTAL TERMS
          </Typography>
        </AccordionSummary>
        <Divider sx={{ m: 0 }} />
        <AccordionDetails>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Security Deposit' InputLabelProps={{
                shrink: true,
              }} placeholder='Security Deposit' {...register('securityDeposit')} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Excess Claim Amount' InputLabelProps={{
                shrink: true,
              }} placeholder='Excess Claim Amount' {...register('excessClaimAmount')} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Delivery & Pick-up Charges' InputLabelProps={{
                shrink: true,
              }} placeholder='Delivery & Pick-up Charges' {...register('deliveryAndPickUpCharges')} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='Special Note for Customers' InputLabelProps={{
                shrink: true,
              }} placeholder='Special Note for Customers' {...register('specialNoteForCustomers')} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label='PaymentMethod' InputLabelProps={{
                shrink: true,
              }} placeholder='PaymentMethod' {...register('paymentMethods')} />
            </Grid>
          </Grid>
        </AccordionDetails>
        <Divider sx={{ m: 0 }} />
      </Accordion>

      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ChevronDown />}
          id='form-layouts-collapsible-header-6'
          aria-controls='form-layouts-collapsible-content-6'
        >
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
            ADD IMAGES
          </Typography>
        </AccordionSummary>
        <Divider sx={{ m: 0 }} />
        <AccordionDetails>
          <Grid container spacing={5}>

            <Grid item xs={6}>
              {preview ? (
                <>
                  <img src={preview}
                    style={{ width: '200px', height: '200px' }}
                    alt="preview" />
                </>
              ) : (
                <>
                  <Avatar
                    alt="Car Image"
                    src={preview}
                    sx={{ width: 200, height: 200, mb: 2 }}
                    variant="rounded"
                  />
                  <Typography> Preview </Typography>

                </>
              )}
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" onClick={onUpload}>
                {uploadButtonLabel}
              </Button>

              <input
                type="file"
                name="image"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
                ref={hiddenInputRef}
              />
            </Grid>

          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary
          expandIcon={<ChevronDown />}
          id='form-layouts-collapsible-header-2'
          aria-controls='form-layouts-collapsible-content-2'
        >
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
            Colours
          </Typography>
        </AccordionSummary>
        <Divider sx={{ m: 0 }} />
        <AccordionDetails>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Controller
                name='colour'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="colour-label">Available Colours</InputLabel>
                    <Select
                      labelId="colour-label"
                      id="colour-select"
                      {...field}
                      value={selectedColor}
                      label="colour"
                      onChange={e => {
                        setSelectedColor(e.target.value);
                        field.onChange(e);
                      }}
                    >
                      <MenuItem value="">Select colour</MenuItem>
                      {colors.map((color) => (
                        <MenuItem key={color} value={color} sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                          <Box display="flex">
                            <Box sx={{ backgroundColor: color, width: 20, height: 20, }} />
                            <Typography variant="body2" sx={{ ml: 1, color: color }}>
                              {color}
                            </Typography>

                          </Box>

                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='colourInterior'
                control={control}
                render={({ field }) => (<FormControl fullWidth>
                  <InputLabel id="colour-label-interior">Interior Colors</InputLabel>
                  <Select
                    labelId="colour-label-interior"
                    id="colour-select-interior"
                    {...field}
                    value={selectedColorInterior}
                    label="colourInterior"
                    onChange={e => {
                      setSelectedColorInterior(e.target.value);
                      field.onChange(e);

                    }}
                  >
                    <MenuItem value="">Select colour</MenuItem>
                    {colors.map((color) => (
                      <MenuItem key={color} value={color} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}>
                        <Box display="flex">
                          <Box sx={{ backgroundColor: color, width: 20, height: 20, }} />
                          <Typography variant="body2" sx={{ ml: 1, color: color }}>
                            {color}
                          </Typography>

                        </Box>

                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='colourExterior'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="colour-label-exterior">Exterior Colors</InputLabel>
                    <Select
                      labelId="colour-label-exterior"
                      id="colour-select-exterior"
                      {...field}
                      value={selectedColorExterior}
                      label="colourExterior"
                      onChange={e => {
                        setSelectedColorExterior(e.target.value);
                        field.onChange(e);
                      }}
                    >
                      <MenuItem value="">Select colour</MenuItem>
                      {colors.map((color) => (
                        <MenuItem key={color} value={color} sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                          <Box display="flex">
                            <Box sx={{ backgroundColor: color, width: 20, height: 20, }} />
                            <Typography variant="body2" sx={{ ml: 1, color: color }}>
                              {color}
                            </Typography>

                          </Box>

                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )} />
            </Grid>

          </Grid>
        </AccordionDetails>
        <Divider sx={{ m: 0 }} />
      </Accordion>

      <AccordionDetails>
        <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
          Update  Car
        </Button>
        <Button size='large' variant='outlined'>
          Cancel
        </Button>
      </AccordionDetails>
    </form>
  )
}

export default CarUpdate
