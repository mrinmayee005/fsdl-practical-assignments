import api from './api';
import { mockBookings, type Booking } from '@/data/bookings';

// These functions currently return mock data
// Replace with actual API calls when backend is ready

export const bookingsService = {
  // Get all bookings for current user
  getAll: async (): Promise<Booking[]> => {
    // Backend ready: return api.get('/bookings').then(res => res.data);
    return Promise.resolve(mockBookings);
  },

  // Get booking by ID
  getById: async (id: string): Promise<Booking | undefined> => {
    // Backend ready: return api.get(`/bookings/${id}`).then(res => res.data);
    return Promise.resolve(mockBookings.find(b => b.id === id));
  },

  // Create a new booking
  create: async (bookingData: {
    packageId: string;
    travelDate: string;
    travelers: number;
  }): Promise<Booking> => {
    // Backend ready: return api.post('/bookings', bookingData).then(res => res.data);
    const newBooking: Booking = {
      id: `BK${Date.now()}`,
      packageId: bookingData.packageId,
      packageName: 'Package Name',
      destination: 'Destination',
      image: '',
      travelDate: bookingData.travelDate,
      travelers: bookingData.travelers,
      totalPrice: 0,
      status: 'pending',
      bookedOn: new Date().toISOString().split('T')[0],
    };
    return Promise.resolve(newBooking);
  },

  // Cancel booking
  cancel: async (id: string): Promise<void> => {
    // Backend ready: return api.delete(`/bookings/${id}`);
    return Promise.resolve();
  },
};
