import {
  Center,
  TextInput,
  PasswordInput,
  Button,
  Flex,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

export default function LoginPage() {
  const EMAIL_FORMAT_REGULAR = /^\S+@\S.\S+$/;
  const PASSWORD_MIN_LENGTH = 8;
  const UPPER_CASE_REGULAR = /[A-Z]/;
  const LOWER_CASE_REGULAR = /[a-z]/;
  const DIGIT_REGULAR = /\d/;
  const SPECIAL_CHARACTER_REGULAR = /!|@|#|\$|%|\^|&|\*/;

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => {
        switch (false) {
          case value.trim() === value:
            return 'Email address must not contain leading or trailing whitespace';
          case value.includes('@'):
            return 'Email address must contain an "@" symbol separating local part and domain name';
          case value.split('@')[1].split('.').length === 2:
            return 'Email address must contain a domain name';
          case EMAIL_FORMAT_REGULAR.test(value):
            return 'Email address must be properly formatted';
        }
      },
      password: (value) => {
        switch (false) {
          case value.length >= PASSWORD_MIN_LENGTH:
            return 'Password must be at least 8 characters long';
          case value.trim() === value:
            return 'Email address must not contain leading or trailing whitespace';
          case UPPER_CASE_REGULAR.test(value):
            return 'Password must contain at least one uppercase letter (A-Z)';
          case LOWER_CASE_REGULAR.test(value):
            return 'Password must contain at least one lowercase letter (a-z)';
          case DIGIT_REGULAR.test(value):
            return 'Password must contain at least one digit (0-9)';
          case SPECIAL_CHARACTER_REGULAR.test(value):
            return 'Password must contain at least one special character (e.g., !@#$%^&*)';
        }
      },
    },
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
