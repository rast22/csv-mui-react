import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleApi } from '../api/vehicleApi';
import { VehicleForm } from '../components/VehicleForm/VehicleForm';
import { Vehicle } from '../types/vehicle';
import { useSnackbar } from 'notistack';
import { Box, CircularProgress } from '@mui/material';

export const EditVehicle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { data: vehicle, isLoading: isLoadingVehicle } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehicleApi.getVehicle(id!),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (data: Partial<Vehicle>) => vehicleApi.updateVehicle(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['vehicle', id] });
      enqueueSnackbar('Vehicle updated successfully', { variant: 'success' });
      navigate(`/vehicles/${id}`);
    },
    onError: (error) => {
      enqueueSnackbar('Failed to update vehicle', { variant: 'error' });
      console.error('Error updating vehicle:', error);
    },
  });

  const handleSubmit = async (data: Partial<Vehicle>) => {
    await mutation.mutateAsync(data);
  };

  if (isLoadingVehicle) {
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
    return null;
  }

  return (
    <VehicleForm
      initialData={vehicle}
      onSubmit={handleSubmit}
      title="Edit vehicle"
      isLoading={mutation.isPending}
    />
  );
};
