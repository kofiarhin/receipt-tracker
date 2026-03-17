import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Card, Button } from '../components/ui';
import { logout } from '../features/authSlice';

export const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="grid gap-4">
      <PageHeader title="Profile" subtitle="Account settings" />
      <Card className="grid gap-2">
        <p><span className="font-medium">Name:</span> {user?.name}</p>
        <p><span className="font-medium">Email:</span> {user?.email}</p>
        <Button onClick={() => dispatch(logout())}>Logout</Button>
      </Card>
    </div>
  );
};
