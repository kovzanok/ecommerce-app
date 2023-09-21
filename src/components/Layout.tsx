import {
  AppShell, Center, Container, Loader,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import CustomHeader from './custom-header';
import { useAppDispatch, useAppSelector } from '../hooks';
import { vertifyAuth } from '../store/slices/userSlice';
import userSelector from '../store/selectors';

export default function Layout() {
  const { loading, user } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(vertifyAuth());
  }, [dispatch]);
  return (
    <div>
      {loading && !user ? (
        <Center h="100vh">
          <Loader color="orange" />
        </Center>
      ) : (
        <AppShell header={<CustomHeader />}>
          <Container size="lg">
            <Outlet />
          </Container>
        </AppShell>
      )}
    </div>
  );
}
