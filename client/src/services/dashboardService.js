import { apiClient } from '../lib/apiClient';

export const fetchDashboardSummaryRequest = async () => (await apiClient.get('/dashboard/summary')).data.data;
