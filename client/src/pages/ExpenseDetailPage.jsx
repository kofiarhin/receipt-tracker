import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader, Spinner, EmptyState } from '../components/ui';
import { DeleteExpenseButton, ExpenseDetailCard } from '../components/domain';
import { useExpenseDetailQuery } from '../hooks/queries/useExpenseDetailQuery';
import { useDeleteExpenseMutation } from '../hooks/mutations/useDeleteExpenseMutation';

export const ExpenseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useExpenseDetailQuery(id);
  const deletion = useDeleteExpenseMutation();

  if (isLoading) return <Spinner />;
  if (isError) return <EmptyState title="Not found" description="Expense not available." />;

  const { expense } = data;
  const onDelete = async () => {
    const confirmed = window.confirm('Delete this expense?');
    if (!confirmed) return;
    await deletion.mutateAsync(id);
    navigate('/expenses');
  };

  return (
    <div className="grid gap-4">
      <PageHeader title="Expense detail" />
      <ExpenseDetailCard>
        <dl className="grid gap-2 text-sm">
          <div><dt className="font-medium">Merchant</dt><dd>{expense.merchant}</dd></div>
          <div><dt className="font-medium">Date</dt><dd>{expense.date ? new Date(expense.date).toLocaleDateString() : 'N/A'}</dd></div>
          <div><dt className="font-medium">Total</dt><dd>{expense.total} {expense.currency}</dd></div>
          <div><dt className="font-medium">Extraction status</dt><dd>{expense.extractionStatus}</dd></div>
        </dl>
        <DeleteExpenseButton onDelete={onDelete} loading={deletion.isPending} />
      </ExpenseDetailCard>
    </div>
  );
};
