export interface Booking {
  id: string;
  packageId: string;
  packageName: string;
  destination: string;
  image: string;
  travelDate: string;
  travelers: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  bookedOn: string;
}

export const mockBookings: Booking[] = [
  {
    id: 'BK001',
    packageId: '1',
    packageName: 'Maldives Paradise Escape',
    destination: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    travelDate: '2026-02-15',
    travelers: 2,
    totalPrice: 4998,
    status: 'confirmed',
    bookedOn: '2026-01-05',
  },
  {
    id: 'BK002',
    packageId: '3',
    packageName: 'Tokyo Cultural Immersion',
    destination: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    travelDate: '2026-03-20',
    travelers: 1,
    totalPrice: 1699,
    status: 'pending',
    bookedOn: '2026-01-07',
  },
  {
    id: 'BK003',
    packageId: '5',
    packageName: 'Romantic Paris Getaway',
    destination: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    travelDate: '2025-12-20',
    travelers: 2,
    totalPrice: 2598,
    status: 'completed',
    bookedOn: '2025-11-15',
  },
  {
    id: 'BK004',
    packageId: '9',
    packageName: 'Iceland Northern Lights',
    destination: 'Iceland',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    travelDate: '2026-04-10',
    travelers: 4,
    totalPrice: 8796,
    status: 'confirmed',
    bookedOn: '2026-01-08',
  },
];

export const getBookingsByStatus = (status: Booking['status']): Booking[] => {
  return mockBookings.filter(booking => booking.status === status);
};
