import { PageHeader, Spinner, EmptyState } from '../components/ui';
import { ExpenseSummaryCard, RecentExpensesCard, SpendingTrendChart } from '../components/domain';
import { useDashboardSummaryQuery } from '../hooks/queries/useDashboardSummaryQuery';

export const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboardSummaryQuery();
  if (isLoading) return <Spinner />;
  if (isError) return <EmptyState title="Unable to load dashboard" description="Please retry shortly." />;

  return (
    <div className="grid gap-4">
      <PageHeader title="Dashboard" subtitle="Overview of your expenses" />
      <section className="grid gap-3 sm:grid-cols-3">
        <ExpenseSummaryCard label="Total spent" value={data.totalSpent.toFixed(2)} />
        <ExpenseSummaryCard label="Receipt count" value={data.receiptCount} />
        <ExpenseSummaryCard label="Average" value={data.averageExpense.toFixed(2)} />
      </section>
      <section className="grid gap-3 lg:grid-cols-2">
        <SpendingTrendChart points={data.monthlySpendingTotals} />
        <RecentExpensesCard expenses={data.recentExpenses} />
      </section>
    </div>
  );
};
