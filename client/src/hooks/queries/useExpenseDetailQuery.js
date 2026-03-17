import { useQuery } from '@tanstack/react-query';
import { fetchExpenseDetailRequest } from '../../services/expenseService';

export const useExpenseDetailQuery = (id) =>
  useQuery({ queryKey: ['expense', id], queryFn: () => fetchExpenseDetailRequest(id), enabled: Boolean(id) });
