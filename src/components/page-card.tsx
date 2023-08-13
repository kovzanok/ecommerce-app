import {
  Card, Flex, Title, Text,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { useHover } from '@mantine/hooks';
import { PageLink } from '../types';

export default function PageCard({ description, name, to }: PageLink) {
  const { ref, hovered } = useHover();
  return (
    <NavLink style={{ textDecoration: 'none' }} to={to}>
      <Card
        ref={ref}
        shadow="lg"
        style={{
          border: '1px solid orange',
          backgroundColor: hovered ? '#00000009' : '',
        }}
        withBorder
        ta="center"
        h={150}
        w={200}
      >
        <Flex h="100%" direction="column" justify="center">
          <Title color="orange" size={18}>
            {name}
          </Title>
          <Text size={14}>{description}</Text>
        </Flex>
      </Card>
    </NavLink>
  );
}
