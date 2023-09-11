import {
  Card,
  Flex,
  Image,
  Text,
  Title,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';

export default function AboutUsPage() {
  return (
    <Flex direction="column">
      <Title ta="center" mb={20} size={24}>
        About us
      </Title>

      <Card
        shadow="lg"
        style={{
          border: '1px solid orange',
          backgroundColor: '#00000009',
        }}
        withBorder
        ta="center"
      >
        <Flex direction="row" justify="flex-start">
          <Image
            maw={240}
            radius="md"
            src="https://s.pfst.net/2011.10/8315372465ce9fb53266667730f2a506ea71b27432_b.jpg"
            alt="Photo"
          />
          <Flex direction="column">
            <Title color="orange" size={18}>Name (role)</Title>
            <Text size={16}>Description</Text>
            <NavLink target="new" style={{ color: 'blue' }} to="https://github.com/theNickola">gitHub</NavLink>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
