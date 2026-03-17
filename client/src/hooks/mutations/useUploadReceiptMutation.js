import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadReceiptRequest } from '../../services/receiptService';

export const useUploadReceiptMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadReceiptRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
    },
  });
};
