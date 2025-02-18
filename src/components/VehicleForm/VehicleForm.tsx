import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  IconButton,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Vehicle } from '../../types/vehicle';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MANUFACTURERS = [
  'MAN',
  'Scania',
  'Mercedes-Benz',
  'Volvo',
  'DAF',
  'IVECO',
  'Kenworth',
  'Peterbilt',
  'Freightliner',
];

interface VehicleFormProps {
  initialData?: Vehicle;
  onSubmit: (data: Partial<Vehicle>) => Promise<void>;
  title: string;
  isLoading?: boolean;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({
  initialData,
  onSubmit,
  title,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>>({
    defaultValues: initialData
      ? {
          licensePlate: initialData.licensePlate,
          manufacturer: initialData.manufacturer,
          vin: initialData.vin,
          customName: initialData.customName,
        }
      : undefined,
  });

  const vinValue = watch('vin', '');

  return (
    <Container maxWidth={false} sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 600, color: 'text.primary' }}
          >
            {title}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper sx={{ p: 3, backgroundColor: 'white', borderRadius: 1, width: '100%', maxWidth: '800px', mb: 3 }}>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 3
            }}>
              <TextField
                label="License plate number"
                {...register('licensePlate', {
                  required: 'License plate is required',
                  pattern: {
                    value: /^[A-Z0-9 ]+$/i,
                    message: 'Invalid license plate format',
                  },
                })}
                variant='filled'
                error={!!errors.licensePlate}
                helperText={errors.licensePlate?.message}
                fullWidth
                size="small"
                sx={{
                  '& .MuiFilledInput-root': {
                    backgroundColor: '#F8F9FA'
                  }
                }}
              />

              <TextField
                select
                label="Manufacturer"
                defaultValue={initialData?.manufacturer || ""}
                {...register('manufacturer', {
                  required: 'Manufacturer is required',
                })}
                variant='filled'
                error={!!errors.manufacturer}
                helperText={errors.manufacturer?.message}
                fullWidth
                size="small"
                sx={{
                  '& .MuiFilledInput-root': {
                    backgroundColor: '#F8F9FA'
                  }
                }}
              >
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                {MANUFACTURERS.map((manufacturer) => (
                  <MenuItem key={manufacturer} value={manufacturer}>
                    {manufacturer}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="VIN"
                {...register('vin', {
                  required: 'VIN is required',
                  pattern: {
                    value: /^[A-HJ-NPR-Z0-9]{17}$/i,
                    message: 'Invalid VIN format',
                  },
                })}
                variant='filled'
                error={!!errors.vin}
                helperText={errors.vin?.message || `${vinValue.length}/17 characters`}
                fullWidth
                size="small"
                inputProps={{ maxLength: 17 }}
                sx={{
                  '& .MuiFilledInput-root': {
                    backgroundColor: '#F8F9FA'
                  }
                }}
              />

              <TextField
                label="Custom name"
                {...register('customName', {
                  required: 'Custom name is required'
                })}
                error={!!errors.customName}
                helperText={errors.customName?.message}
                fullWidth
                variant='filled'
                size="small"
                sx={{
                  '& .MuiFilledInput-root': {
                    backgroundColor: '#F8F9FA'
                  }
                }}
              />
            </Box>
          </Paper>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{
                backgroundColor: '#0067E6',
                '&:hover': {
                  backgroundColor: '#0056BF'
                }
              }}
            >
              {isLoading ? 'Saving...' : 'Add vehicle'}
            </Button>
            <Button
              variant="text"
              onClick={() => navigate(-1)}
              sx={{ color: '#0067E6' }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
