import { Flex } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { IconHome, IconId } from '@tabler/icons-react';
import HeaderLink from './header-link';

export default function UserLayout() {
  return (
    <>
      <Flex columnGap={40}>
        <HeaderLink text="Personal Info" icon={<IconId />} to="personal-info" />
        <HeaderLink text="Addresses" icon={<IconHome />} to="addresses" />
      </Flex>
      <Outlet />
    </>
  );
}
