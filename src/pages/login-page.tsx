import {
  Center,
  TextInput,
  PasswordInput,
  Button,
  Flex,
  Title,
} from '@mantine/core';

export default function LoginPage() {
  return (
    <Center h="100vh">
      <Flex direction="column" gap="lg">
        <Title color="orange" ta="center">
          Login
        </Title>
        <form
          style={{
            border: '1px solid orange',
            borderRadius: '5px',
            width: '480px',
          }}
        >
          <Flex p="20px" direction="column" gap="lg">
            <TextInput withAsterisk label="Email" />
            <PasswordInput withAsterisk label="Password" />
            <Button type="submit" m="auto" w="40%" color="orange" size="md">
              Sign in
            </Button>
          </Flex>
        </form>
      </Flex>
    </Center>
  );
}
