import {
  Header, Image, Flex, Container,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function CustomHeader() {
  return (
    <Header height={60}>
      <Container h="100%" size="xl">
        <Flex h="100%" align="center">
          <NavLink to="/">
            <Image width={50} height={50} src={logo} />
          </NavLink>
        </Flex>
      </Container>
    </Header>
  );
}
