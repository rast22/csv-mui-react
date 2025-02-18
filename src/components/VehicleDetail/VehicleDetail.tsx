import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  CircularProgress,
  Divider,
  IconButton,
} from '@mui/material';
import { vehicleApi } from '../../api/vehicleApi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehicleApi.getVehicle(id!),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: vehicleApi.deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      navigate('/vehicles');
    },
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!vehicle) {
    return (
      <Container maxWidth={false} sx={{ py: 3 }}>
        <Typography>Vehicle not found</Typography>
      </Container>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      deleteMutation.mutate(vehicle.id);
    }
  };

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
            onClick={() => navigate('/vehicles')}
            sx={{ mr: 2, color: '#0067E6' }}
            aria-label="back"
          >
            <ArrowBackIcon sx={{mr: 2}} />
              Back
          </IconButton>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontSize: '24px', fontWeight: 600, color: 'text.primary', flex: 1 }}
          >
              {vehicle.licensePlate}
          </Typography>
        </Box>

        <Paper sx={{ p: 3, backgroundColor:'white', display:'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 3}}>
                <Box>
                    <img
                        src="/scania-placeholder.jpg"
                        alt="Vehicle"
                        style={{
                            maxWidth: '160px',
                            maxHeight: '160px',
                            height: '100%',
                            objectFit: 'cover',
                            aspectRatio: '1/1',
                            borderRadius: 100
                        }}
                    />
                </Box>
                <div>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h5" sx={{fontSize: '24px', fontWeight: 500}}>
                            {vehicle.customName}
                        </Typography>
                        <Typography color="text.secondary">
                            {vehicle.licensePlate}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px'}}>
                        <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ fontWeight: 'bold' }}
                        >
                            Model
                        </Typography>
                        <Typography>{vehicle.manufacturer}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px'}}>
                        <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ fontWeight: 'bold' }}
                        >
                            VIN
                        </Typography>
                        <Typography>{vehicle.vin}</Typography>
                    </Box>
                </div>
            </Box>

          <Box sx={{ display: 'flex', gap: 2, height: 'fit-content' }}>
              <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
              >
                  Delete
              </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/vehicles/${id}/edit`)}
            >
              Edit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
