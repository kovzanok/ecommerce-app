import {
  Card, Flex, Title, Text, Image,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { PersonData } from '../../types';

export default function PersonCard({
  name,
  role,
  description,
  photoLink,
  gitLink,
}: PersonData) {
  return (
    <Card
      shadow="lg"
      style={{
        border: '1px solid orange',
        backgroundColor: '#00000009',
      }}
      withBorder
    >
      <Flex direction="row" justify="flex-start">
        <Image maw={240} radius="md" src={photoLink} alt="Photo" />
        <Flex
          direction="column"
          justify="space-between"
          style={{
            padding: '7px',
          }}
        >
          <Title color="orange" size={20}>
            {name}
          </Title>
          <Title color="orange" size={14}>
            {role}
          </Title>
          <Text size={16}>{description}</Text>
          <NavLink target="new" style={{ color: 'blue' }} to={gitLink}>
            gitHub
          </NavLink>
        </Flex>
      </Flex>
    </Card>
  );
}
