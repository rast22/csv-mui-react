import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleApi } from '../api/vehicleApi';
import { VehicleForm } from '../components/VehicleForm/VehicleForm';
import { Vehicle } from '../types/vehicle';
import { useSnackbar } from 'notistack';

export const NewVehicle: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation({
    mutationFn: (data: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) =>
      vehicleApi.createVehicle(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      enqueueSnackbar('Vehicle created successfully', { variant: 'success' });
      navigate(`/vehicles/${data.id}`);
    },
    onError: (error) => {
      enqueueSnackbar('Failed to create vehicle', { variant: 'error' });
      console.error('Error creating vehicle:', error);
    },
  });

  const handleSubmit = async (data: Partial<Vehicle>) => {
    await mutation.mutateAsync(data as Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>);
  };

  return (
    <VehicleForm
      onSubmit={handleSubmit}
      title="Add new vehicle"
      isLoading={mutation.isPending}
    />
  );
};
