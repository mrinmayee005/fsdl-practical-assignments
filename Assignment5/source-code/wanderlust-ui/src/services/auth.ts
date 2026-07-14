import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// These functions currently use localStorage for demo
// Replace with actual API calls when backend is ready

export const authService = {
  // Login
  login: async (email: string, password: string): Promise<AuthResponse> => {
    // Backend ready: return api.post('/auth/login', { email, password }).then(res => res.data);
    
    // Mock login - accepts any credentials for demo
    const mockUser: User = {
      id: '1',
      name: 'Demo User',
      email: email,
      isAdmin: email.includes('admin'),
    };
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('authToken', mockToken);
    
    return Promise.resolve({ user: mockUser, token: mockToken });
  },

  // Register
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    // Backend ready: return api.post('/auth/register', { name, email, password }).then(res => res.data);
    
    const mockUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      isAdmin: false,
    };
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('authToken', mockToken);
    
    return Promise.resolve({ user: mockUser, token: mockToken });
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },
};
