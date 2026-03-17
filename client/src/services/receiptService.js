import { apiClient } from '../lib/apiClient';

export const uploadReceiptRequest = async (file) => {
  const formData = new FormData();
  formData.append('receipt', file);
  return (await apiClient.post('/receipts/upload', formData)).data.data;
};
