import { AppShell, Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import CustomHeader from './custom-header';

export default function Layout() {
  return (
    <AppShell header={<CustomHeader />}>
      <Container size="lg">
        <Outlet />
      </Container>
    </AppShell>
  );
}
