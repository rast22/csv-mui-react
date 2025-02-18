import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleApi } from '../api/vehicleApi';
import { VehicleForm } from '../components/VehicleForm/VehicleForm';
import { Vehicle } from '../types/vehicle';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

export const NewVehicle: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState<string | undefined>();

  const mutation = useMutation({
    mutationFn: (data: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) =>
      vehicleApi.createVehicle(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      enqueueSnackbar('Vehicle created successfully', { variant: 'success' });
      navigate(`/vehicles/${data.id}`);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        setError('A vehicle with this VIN already exists');
        enqueueSnackbar('A vehicle with this VIN already exists', { variant: 'error' });
      } else {
        setError('Failed to create vehicle');
        enqueueSnackbar('Failed to create vehicle', { variant: 'error' });
      }
      console.error('Error creating vehicle:', error);
    },
  });

  const handleSubmit = async (data: Partial<Vehicle>) => {
    setError(undefined);
    await mutation.mutateAsync(data as Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>);
  };

  return (
    <VehicleForm
      onSubmit={handleSubmit}
      title="Add new vehicle"
      isLoading={mutation.isPending}
      error={error}
    />
  );
};
