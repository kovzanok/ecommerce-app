import {
  Card, Flex, Title, Text, Image, MediaQuery,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { PersonData } from '../../types';

export default function PersonCard({
  name,
  role,
  description,
  photoLink,
  gitLink,
  contributions,
}: PersonData) {
  return (
    <Card
      shadow="lg"
      style={{
        border: '1px solid orange',
        backgroundColor: '#00000009',
      }}
      withBorder
      mb={10}
    >
      <MediaQuery
        query="(max-width:680px)"
        styles={{ flexDirection: 'column', alignItems: 'center' }}
      >
        <Flex direction="row" justify="flex-start">
          <Image
            radius="md"
            src={photoLink}
            alt="Photo"
            style={{
              maxWidth: '300px',
              minWidth: '240px',
              flexBasis: '240px',
            }}
          />
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
            <Text weight={600} mt={10} mb={10}>
              Contributions:
              <Text span weight={400}>
                &nbsp;
                {contributions}
              </Text>
            </Text>
            <NavLink target="new" style={{ color: 'blue' }} to={gitLink}>
              gitHub
            </NavLink>
          </Flex>
        </Flex>
      </MediaQuery>
    </Card>
  );
}
