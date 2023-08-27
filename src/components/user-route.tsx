import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import userSelector from '../store/selectors';
import UserLayout from './UserLayout';

export default function UserRoute() {
  const { user } = useAppSelector(userSelector);
  return user ? <UserLayout /> : <Navigate replace to="/login" />;
}
