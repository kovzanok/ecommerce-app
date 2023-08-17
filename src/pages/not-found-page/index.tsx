import {
  Text, Title, Flex, Container, Button,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import imageSrc from '../../assets/not-found.png';

export default function NotFoundPage() {
  return (
    <Container>
      <Flex wrap="wrap" columnGap={10} align="center" justify="space-evenly">
        <Flex align="center" rowGap={20} direction="column">
          <Title ta="center" size={24}>
            Whoops, that page&apos;s gone.
          </Title>
          <Text size={18} ta="center">
            The link you clicked may be broken or the page may have been
            removed. You can get back to main page.
          </Text>
          <Button color="orange">
            <NavLink
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
              to="/"
            >
              Back to main
            </NavLink>
          </Button>
        </Flex>
        <img
          style={{
            minWidth: '300px',
          }}
          width="55%"
          height="100%"
          src={imageSrc}
          alt="Not found"
        />
      </Flex>
    </Container>
  );
}
