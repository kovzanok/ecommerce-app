import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import userSelector from '../store/selectors';
import UserLayout from './UserLayout';

export default function UserRoute() {
  const { user } = useAppSelector(userSelector);
  const location = useLocation();
  return user ? (
    <UserLayout />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
