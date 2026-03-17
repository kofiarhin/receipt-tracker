import { useQuery } from '@tanstack/react-query';
import { fetchExpensesRequest } from '../../services/expenseService';

export const useExpensesQuery = (params) =>
  useQuery({ queryKey: ['expenses', params], queryFn: () => fetchExpensesRequest(params) });
