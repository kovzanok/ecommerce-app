import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import userSelector from '../../store/selectors';

export default function UserPage() {
  const { user } = useAppSelector(userSelector);
  if (!user) return <Navigate to="/login" />;
  return <div>UserPage</div>;
}
