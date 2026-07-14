import api from './api';
import { packages, getPackageById, getFeaturedPackages, type TravelPackage } from '@/data/packages';

// These functions currently return mock data
// Replace with actual API calls when backend is ready

export const packagesService = {
  // Get all packages
  getAll: async (): Promise<TravelPackage[]> => {
    // Backend ready: return api.get('/packages').then(res => res.data);
    return Promise.resolve(packages);
  },

  // Get package by ID
  getById: async (id: string): Promise<TravelPackage | undefined> => {
    // Backend ready: return api.get(`/packages/${id}`).then(res => res.data);
    return Promise.resolve(getPackageById(id));
  },

  // Get featured packages
  getFeatured: async (): Promise<TravelPackage[]> => {
    // Backend ready: return api.get('/packages/featured').then(res => res.data);
    return Promise.resolve(getFeaturedPackages());
  },

  // Create package (Admin)
  create: async (packageData: Omit<TravelPackage, 'id'>): Promise<TravelPackage> => {
    // Backend ready: return api.post('/packages', packageData).then(res => res.data);
    const newPackage = { ...packageData, id: Date.now().toString() } as TravelPackage;
    return Promise.resolve(newPackage);
  },

  // Update package (Admin)
  update: async (id: string, packageData: Partial<TravelPackage>): Promise<TravelPackage> => {
    // Backend ready: return api.put(`/packages/${id}`, packageData).then(res => res.data);
    const existing = getPackageById(id);
    if (!existing) throw new Error('Package not found');
    return Promise.resolve({ ...existing, ...packageData });
  },

  // Delete package (Admin)
  delete: async (id: string): Promise<void> => {
    // Backend ready: return api.delete(`/packages/${id}`);
    return Promise.resolve();
  },
};
