import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, SearchInput, EmptyState, Spinner } from '../components/ui';
import { ExpenseList } from '../components/domain';
import { useExpensesQuery } from '../hooks/queries/useExpensesQuery';

export const ExpensesPage = () => {
  const [search, setSearch] = useState('');
  const { data, isLoading, isError } = useExpensesQuery({ search, page: 1, limit: 20 });

  return (
    <div className="grid gap-4">
      <PageHeader title="Expense history" />
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      {isLoading ? <Spinner /> : null}
      {isError ? <EmptyState title="Error" description="Could not load expenses." /> : null}
      {!isLoading && !isError && data.items.length === 0 ? <EmptyState title="No expenses" description="Upload a receipt to get started." /> : null}
      <ExpenseList>
        {data?.items?.map((expense) => (
          <Link className="rounded-lg bg-white p-4 shadow-sm" key={expense._id} to={`/expenses/${expense._id}`}>
            <p className="font-medium">{expense.merchant}</p>
            <p className="text-sm text-slate-600">{expense.total} {expense.currency}</p>
          </Link>
        ))}
      </ExpenseList>
    </div>
  );
};
