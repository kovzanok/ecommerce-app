import {
  Header, Image, Flex, Container, Button, Group,
} from '@mantine/core';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  IconKey,
  IconUserPlus,
  IconBuildingStore,
  IconUserCircle,
  IconShoppingCart,
} from '@tabler/icons-react';
import logo from '../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../hooks';
import userSelector from '../../store/selectors';
import { logout } from '../../store/slices/userSlice';
import AuthModule from '../../service/modules/auth-module';
import HeaderLink from '../header-link';

export default function CustomHeader() {
  const { user } = useAppSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logout());
    localStorage.removeItem('qwe_access-token');
    AuthModule.creatAnonymousApiRoot();
    navigate('/login');
  };

  const authorizedUserLinks = (
    <Group>
      <HeaderLink
        to="/user/personal-info"
        text="Profile"
        icon={<IconUserCircle />}
      />
      <Button onClick={handleClick} variant="outline" color="orange">
        Logout
      </Button>
    </Group>
  );

  const authLinks = (
    <Group spacing="30px">
      <HeaderLink icon={<IconKey />} to="/login" text="Sign in" />
      <HeaderLink icon={<IconUserPlus />} to="/register" text="Sign up" />
    </Group>
  );

  return (
    <Header height={60}>
      <Container h="100%" size="xl">
        <Flex h="100%" align="center" justify="space-between">
          <NavLink to="/">
            <Image width={50} height={50} src={logo} />
          </NavLink>
          <Group>
            <HeaderLink
              icon={<IconBuildingStore />}
              to="/catalog"
              text="Catalog"
            />
            <HeaderLink icon={<IconShoppingCart />} to="/cart" text="Cart" />
            {user ? authorizedUserLinks : authLinks}
          </Group>
        </Flex>
      </Container>
    </Header>
  );
}
