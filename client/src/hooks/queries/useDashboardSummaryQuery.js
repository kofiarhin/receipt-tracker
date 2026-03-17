import { useQuery } from '@tanstack/react-query';
import { fetchDashboardSummaryRequest } from '../../services/dashboardService';

export const useDashboardSummaryQuery = () =>
  useQuery({ queryKey: ['dashboard-summary'], queryFn: fetchDashboardSummaryRequest });
