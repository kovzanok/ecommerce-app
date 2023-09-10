import {
  Header,
  Image,
  Flex,
  Container,
  Button,
  Group,
  MediaQuery,
  Burger,
} from '@mantine/core';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  IconKey,
  IconUserPlus,
  IconBuildingStore,
  IconUserCircle,
  IconShoppingCart,
  IconUsers,
} from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import logo from '../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../hooks';
import userSelector from '../../store/selectors';
import { logout } from '../../store/slices/userSlice';
import AuthModule from '../../service/modules/auth-module';
import HeaderLink from '../header-link';

export default function CustomHeader() {
  const { user } = useAppSelector(userSelector);
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const matches = useMediaQuery('(max-width: 600px)');
  const handleClick = () => {
    dispatch(logout());
    localStorage.removeItem('qwe_access-token');
    close();
    AuthModule.creatAnonymousApiRoot();
    navigate('/login');
  };

  const authorizedUserLinks = (
    <Group>
      <HeaderLink
        onClick={close}
        fz={matches ? '26px' : '14px'}
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
      <HeaderLink
        onClick={close}
        fz={matches ? '26px' : '14px'}
        icon={<IconKey />}
        to="/login"
        text="Sign in"
      />
      <HeaderLink
        onClick={close}
        fz={matches ? '26px' : '14px'}
        icon={<IconUserPlus />}
        to="/register"
        text="Sign up"
      />
    </Group>
  );

  const content = (
    <>
      <HeaderLink
        onClick={close}
        fz={matches ? '26px' : '14px'}
        icon={<IconUsers />}
        to="/about-us"
        text="About Us"
      />
      <HeaderLink
        onClick={close}
        fz={matches ? '26px' : '14px'}
        icon={<IconBuildingStore />}
        to="/catalog"
        text="Catalog"
      />
      <HeaderLink
        onClick={close}
        fz={matches ? '26px' : '14px'}
        icon={<IconShoppingCart />}
        to="/cart"
        text="Cart"
      />
      {user ? authorizedUserLinks : authLinks}
    </>
  );

  const mobileMenu = (
    <Flex
      style={{
        zIndex: 100,
        fontSize: '30px !important',
        display: opened ? 'flex' : 'none',
      }}
      align="center"
      fz="xl"
      w="100%"
      pos="fixed"
      h="100%"
      direction="column"
      justify="center"
      bg="white"
      rowGap={40}
    >
      {content}
    </Flex>
  );

  return (
    <>
      <Header height={60}>
        <Container h="100%" size="xl">
          <Flex w="100%" h="100%" align="center" justify="space-between">
            <NavLink to="/">
              <Image width={50} height={50} src={logo} />
            </NavLink>
            <MediaQuery query="(max-width: 600px)" styles={{ display: 'none' }}>
              <Flex
                columnGap={20}
                w="100%"
                h="100%"
                align="center"
                justify="end"
              >
                {content}
              </Flex>
            </MediaQuery>
          </Flex>
        </Container>
      </Header>
      {mobileMenu}
      <MediaQuery styles={{ display: 'block' }} query="(max-width: 600px)">
        <Burger
          pos="fixed"
          right={20}
          top={20}
          style={{ zIndex: 110 }}
          color="orange"
          opened={opened}
          onClick={toggle}
          display="none"
        />
      </MediaQuery>
    </>
  );
}
