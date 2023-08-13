import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import userSelector from '../store/selectors';

export default function AuthRoute() {
  const { user } = useAppSelector(userSelector);
  return user ? <Navigate to="/" replace /> : <Outlet />;
}
