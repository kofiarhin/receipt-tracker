import { apiClient } from '../lib/apiClient';

export const fetchExpensesRequest = async (params) => (await apiClient.get('/expenses', { params })).data.data;
export const fetchExpenseDetailRequest = async (id) => (await apiClient.get(`/expenses/${id}`)).data.data;
export const deleteExpenseRequest = async (id) => (await apiClient.delete(`/expenses/${id}`)).data.data;
