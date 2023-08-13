import { AppShell, Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import CustomHeader from './custom-header';

export default function Layout() {
  return (
    <AppShell header={<CustomHeader />}>
      <Container h="100vh">
        <Outlet />
      </Container>
    </AppShell>
  );
}
