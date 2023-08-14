import {
  Center,
  TextInput,
  PasswordInput,
  Button,
  Flex,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { validateEmail, validatePassword } from '../utils/field-validation';

export default function LoginPage() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => validateEmail(value),
      password: (value) => validatePassword(value),
    },
    validateInputOnChange: true,
  });

  return (
    <Center h="100vh">
      <Flex direction="column" gap="lg">
        <Title color="orange" ta="center">
          Login
        </Title>
        <form
          onSubmit={form.onSubmit((values) => values)}
          style={{
            border: '1px solid orange',
            borderRadius: '5px',
            width: '480px',
          }}
        >
          <Flex p="20px" direction="column" gap="lg">
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              {...form.getInputProps('password')}
            />
            <Button type="submit" m="auto" w="40%" color="orange" size="md">
              Sign in
            </Button>
          </Flex>
        </form>
      </Flex>
    </Center>
  );
}
