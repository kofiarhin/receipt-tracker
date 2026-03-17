import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { DashboardPage } from '../pages/DashboardPage';
import { UploadPage } from '../pages/UploadPage';
import { ExpensesPage } from '../pages/ExpensesPage';
import { ExpenseDetailPage } from '../pages/ExpenseDetailPage';
import { ProfilePage } from '../pages/ProfilePage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { meRequest } from '../services/authService';
import { logout, setCredentials, setHydrated } from '../features/authSlice';

const PublicLayout = ({ children }) => <main className="grid min-h-screen place-items-center p-4">{children}</main>;

const AppLayout = ({ children }) => (
  <div className="min-h-screen md:grid md:grid-cols-[220px_1fr]">
    <aside className="hidden bg-white p-4 shadow-sm md:block">
      <nav className="grid gap-2 text-sm">
        {['dashboard', 'upload', 'expenses', 'profile'].map((route) => (
          <NavLink key={route} to={`/${route}`} className="capitalize">{route}</NavLink>
        ))}
      </nav>
    </aside>
    <main className="p-4">{children}</main>
  </div>
);

const AuthHydrator = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const hydrate = async () => {
      const token = localStorage.getItem('receipt_tracker_token');
      if (!token) return dispatch(setHydrated(true));
      try {
        const me = await meRequest();
        dispatch(setCredentials({ token, user: me.user }));
      } catch (_err) {
        dispatch(logout());
      } finally {
        dispatch(setHydrated(true));
      }
    };
    hydrate();
  }, [dispatch]);
  return children;
};

export const AppRouter = () => (
  <BrowserRouter>
    <AuthHydrator>
      <Routes>
        <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
        <Route path="/signup" element={<PublicLayout><SignupPage /></PublicLayout>} />
        <Route path="/dashboard" element={<ProtectedRoute><AppLayout><DashboardPage /></AppLayout></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><AppLayout><UploadPage /></AppLayout></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute><AppLayout><ExpensesPage /></AppLayout></ProtectedRoute>} />
        <Route path="/expenses/:id" element={<ProtectedRoute><AppLayout><ExpenseDetailPage /></AppLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><AppLayout><ProfilePage /></AppLayout></ProtectedRoute>} />
        <Route path="*" element={<PublicLayout><LoginPage /></PublicLayout>} />
      </Routes>
    </AuthHydrator>
  </BrowserRouter>
);
