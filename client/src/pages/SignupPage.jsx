import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthForm } from '../components/domain';
import { Input, PasswordInput } from '../components/ui';
import { useSignupMutation } from '../hooks/mutations/useSignupMutation';
import { setCredentials } from '../features/authSlice';

export const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = useSignupMutation();

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = await signup.mutateAsync(form);
    dispatch(setCredentials(data));
    navigate('/dashboard');
  };

  return <div className="w-full max-w-md grid gap-2"><AuthForm title="Sign up" submitLabel="Create account" loading={signup.isPending} error={signup.error?.response?.data?.message} onSubmit={onSubmit} fields={<><Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><PasswordInput label="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></>} /><Link className="text-sm text-brand-600" to="/login">Already have an account?</Link></div>;
};
