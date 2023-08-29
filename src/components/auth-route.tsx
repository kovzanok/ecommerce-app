import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import userSelector from '../store/selectors';

export default function AuthRoute() {
  const { user } = useAppSelector(userSelector);
  const location = useLocation();
  return user ? (
    <Navigate to={location.state?.from || '/'} replace />
  ) : (
    <Outlet />
  );
}
