import {
  Center,
  TextInput,
  PasswordInput,
  Button,
  Flex,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { useAppDispatch, useAppSelector } from '../hooks';
import { validateEmail, validatePassword } from '../utils/field-validation';
import { signIn } from '../store/slices/userSlice';
import userSelector from '../store/selectors';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(userSelector);
  const form = useForm<CustomerSignin>({
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

  const handleSubmit = (values: CustomerSignin) => {
    dispatch(signIn(values));
  };

  return (
    <Center h="100vh">
      <Flex direction="column" gap="lg">
        <Title color="orange" ta="center">
          Login
        </Title>
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          style={{
            border: '1px solid orange',
            borderRadius: '5px',
            width: '480px',
          }}
        >
          <Flex p="20px" direction="column" gap="lg">
            <TextInput
              disabled={loading}
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              disabled={loading}
              withAsterisk
              label="Password"
              {...form.getInputProps('password')}
            />
            <Button
              disabled={loading}
              type="submit"
              m="auto"
              w="40%"
              color="orange"
              size="md"
            >
              Sign in
            </Button>
          </Flex>
        </form>
      </Flex>
    </Center>
  );
}
