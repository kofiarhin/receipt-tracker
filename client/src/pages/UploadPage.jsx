import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, FileUploadInput, Button, Alert } from '../components/ui';
import { UploadDropzone, ReceiptProcessingStatus } from '../components/domain';
import { useUploadReceiptMutation } from '../hooks/mutations/useUploadReceiptMutation';

export const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('no file selected');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const upload = useUploadReceiptMutation();

  const submit = async () => {
    if (!file) return setError('Please select a file first');
    setError('');
    setMessage('processing');
    try {
      const data = await upload.mutateAsync(file);
      setMessage('success');
      navigate(`/expenses/${data.expense._id}`);
    } catch (_e) {
      setMessage('failure');
      setError('Upload failed. Please retry.');
    }
  };

  return (
    <div className="grid gap-4">
      <PageHeader title="Upload receipt" subtitle="OCR will parse your receipt" />
      <UploadDropzone>
        <div className="grid gap-3">
          {error ? <Alert>{error}</Alert> : null}
          <FileUploadInput onChange={(value) => { setFile(value); setMessage(value ? 'file selected' : 'no file selected'); }} />
          <ReceiptProcessingStatus status={upload.isPending ? 'uploading' : message} />
          <Button onClick={submit} disabled={upload.isPending}>{upload.isPending ? 'Uploading...' : 'Process receipt'}</Button>
        </div>
      </UploadDropzone>
    </div>
  );
};
