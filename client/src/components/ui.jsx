import { useState } from 'react';

export const Button = ({ children, className = '', ...props }) => (
  <button
    className={`rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const Input = ({ label, error, ...props }) => (
  <label className="grid gap-1 text-sm">
    <span className="font-medium text-slate-700">{label}</span>
    <input className="rounded-md border border-slate-300 px-3 py-2" {...props} />
    {error ? <span className="text-xs text-red-600">{error}</span> : null}
  </label>
);

export const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="grid gap-1">
      <Input {...props} type={visible ? 'text' : 'password'} />
      <button type="button" className="text-left text-xs text-brand-600" onClick={() => setVisible((v) => !v)}>
        {visible ? 'Hide password' : 'Show password'}
      </button>
    </div>
  );
};

export const Card = ({ children, className = '' }) => (
  <section className={`rounded-xl bg-white p-5 shadow-sm ${className}`}>{children}</section>
);

export const Alert = ({ variant = 'error', children }) => (
  <p className={`rounded-md p-3 text-sm ${variant === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>{children}</p>
);

export const Spinner = () => <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-brand-600" />;

export const EmptyState = ({ title, description }) => (
  <Card>
    <h3 className="font-semibold text-slate-900">{title}</h3>
    <p className="text-sm text-slate-600">{description}</p>
  </Card>
);

export const PageHeader = ({ title, subtitle, actions }) => (
  <header className="mb-4 grid gap-2 md:flex md:items-center md:justify-between">
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      {subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
    </div>
    {actions}
  </header>
);

export const SearchInput = (props) => <Input label="Search" placeholder="Search..." {...props} />;

export const FileUploadInput = ({ onChange, error }) => (
  <label className="grid cursor-pointer gap-2 rounded-lg border border-dashed border-slate-300 p-5 text-center">
    <span className="text-sm text-slate-700">Choose or drag a receipt image</span>
    <input type="file" accept="image/*" className="hidden" onChange={(e) => onChange(e.target.files?.[0])} />
    {error ? <span className="text-xs text-red-600">{error}</span> : null}
  </label>
);
