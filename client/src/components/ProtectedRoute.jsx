import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from './ui';

export const ProtectedRoute = ({ children }) => {
  const { token, hydrated } = useSelector((state) => state.auth);
  if (!hydrated) return <Spinner />;
  if (!token) return <Navigate to="/login" replace />;
  return children;
};
