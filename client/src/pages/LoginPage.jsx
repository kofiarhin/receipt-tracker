import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthForm } from '../components/domain';
import { Input, PasswordInput } from '../components/ui';
import { useLoginMutation } from '../hooks/mutations/useLoginMutation';
import { setCredentials } from '../features/authSlice';

export const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useLoginMutation();

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = await login.mutateAsync(form);
    dispatch(setCredentials(data));
    navigate('/dashboard');
  };

  return <div className="w-full max-w-md grid gap-2"><AuthForm title="Login" submitLabel="Login" loading={login.isPending} error={login.error?.response?.data?.message} onSubmit={onSubmit} fields={<><Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><PasswordInput label="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></>} /><Link className="text-sm text-brand-600" to="/signup">Create account</Link></div>;
};
