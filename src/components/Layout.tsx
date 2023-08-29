import { AppShell, Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import CustomHeader from './custom-header';
import { useAppDispatch } from '../hooks';
import { vertifyAuth } from '../store/slices/userSlice';

export default function Layout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(vertifyAuth());
  }, [dispatch]);
  return (
    <div>
      <AppShell header={<CustomHeader />}>
        <Container size="lg">
          <Outlet />
        </Container>
      </AppShell>
    </div>
  );
}
