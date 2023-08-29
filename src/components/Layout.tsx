import { AppShell, Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import CustomHeader from './custom-header';
import { useAppDispatch } from '../hooks';
import { vertifyAuth } from '../store/slices/userSlice';

export default function Layout() {
  // const { loading } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(vertifyAuth());
  }, [dispatch]);
  return (
    <div>
      {/* {loading ? (
        <Center h="100vh">
          <Loader color="orange" />
        </Center>
      ) : ( */}
      <AppShell header={<CustomHeader />}>
        <Container size="lg">
          <Outlet />
        </Container>
      </AppShell>
      {/* )} */}
    </div>
  );
}
