import {
  TextInput,
  PasswordInput,
  Button,
  Flex,
  Title,
  Paper,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { NavLink } from 'react-router-dom';
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
    <Paper m="auto" maw={450} mt={100}>
      <Flex direction="column" gap="lg">
        <Title color="orange" ta="center">
          Login
        </Title>
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          style={{
            border: '1px solid orange',
            borderRadius: '5px',
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
              w="50%"
              color="orange"
              size="md"
            >
              Sign in
            </Button>
            <Text m="auto">
              Don&apos;t have a account?&nbsp;
              <NavLink to="/register">Sing up</NavLink>
            </Text>
          </Flex>
        </form>
      </Flex>
    </Paper>
  );
}
