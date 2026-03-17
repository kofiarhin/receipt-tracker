import { apiClient } from '../lib/apiClient';

export const registerRequest = async (payload) => (await apiClient.post('/auth/register', payload)).data.data;
export const loginRequest = async (payload) => (await apiClient.post('/auth/login', payload)).data.data;
export const meRequest = async () => (await apiClient.get('/auth/me')).data.data;
