import axios from 'axios';
import { Vehicle } from '../types/vehicle';

const API_URL = 'http://localhost:3001'; // You'll need to set up a backend server

export const vehicleApi = {
  getVehicles: async (): Promise<Vehicle[]> => {
    const response = await axios.get(`${API_URL}/vehicles`);
    return response.data;
  },

  getVehicle: async (id: string): Promise<Vehicle> => {
    const response = await axios.get(`${API_URL}/vehicles/${id}`);
    return response.data;
  },

  createVehicle: async (vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> => {
    const response = await axios.post(`${API_URL}/vehicles`, vehicle);
    return response.data;
  },

  updateVehicle: async (id: string, vehicle: Partial<Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Vehicle> => {
    const response = await axios.patch(`${API_URL}/vehicles/${id}`, vehicle);
    return response.data;
  },

  deleteVehicle: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/vehicles/${id}`);
  },
};
