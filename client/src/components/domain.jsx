import { Card, Button, Alert } from './ui';

export const AuthForm = ({ title, onSubmit, submitLabel, fields, loading, error }) => (
  <Card className="grid gap-4">
    <h1 className="text-xl font-semibold">{title}</h1>
    {error ? <Alert>{error}</Alert> : null}
    <form className="grid gap-3" onSubmit={onSubmit}>
      {fields}
      <Button type="submit" disabled={loading}>{loading ? 'Please wait...' : submitLabel}</Button>
    </form>
  </Card>
);

export const UploadDropzone = ({ children }) => <Card>{children}</Card>;
export const ReceiptProcessingStatus = ({ status }) => <p className="text-sm text-slate-600">Status: {status}</p>;
export const ExpenseSummaryCard = ({ label, value }) => <Card><p className="text-sm text-slate-600">{label}</p><p className="text-xl font-semibold">{value}</p></Card>;
export const ExpenseList = ({ children }) => <div className="grid gap-3">{children}</div>;
export const ExpenseDetailCard = ({ children }) => <Card>{children}</Card>;
export const SpendingTrendChart = ({ points = [] }) => <Card><h3 className="font-semibold">Monthly spending</h3><ul className="mt-2 text-sm">{points.map((p) => <li key={p.month}>{p.month}: {p.total.toFixed(2)}</li>)}</ul></Card>;
export const RecentExpensesCard = ({ expenses = [] }) => <Card><h3 className="font-semibold">Recent Expenses</h3><ul className="mt-2 text-sm">{expenses.map((item) => <li key={item._id}>{item.merchant} - {item.total}</li>)}</ul></Card>;
export const DeleteExpenseButton = ({ onDelete, loading }) => <Button className="bg-red-600" onClick={onDelete} disabled={loading}>Delete expense</Button>;
