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
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useTitle } from '../hooks';
import { validateEmail, validatePassword } from '../utils/field-validation';
import { resetError, signIn } from '../store/slices/userSlice';
import userSelector from '../store/selectors';

export default function LoginPage() {
  useTitle('Login');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(userSelector);
  const { setFieldError, onSubmit, getInputProps } = useForm<CustomerSignin>({
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

  useEffect(
    () => () => {
      dispatch(resetError());
    },
    [],
  );

  useEffect(() => {
    if (error === 'Customer account with the given credentials not found.') {
      setFieldError('email', error);
      setFieldError('password', error);
    }
  }, [error, setFieldError]);

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
          onSubmit={onSubmit(handleSubmit)}
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
              {...getInputProps('email')}
            />
            <PasswordInput
              disabled={loading}
              withAsterisk
              label="Password"
              {...getInputProps('password')}
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
              <NavLink to="/register">Sign up</NavLink>
            </Text>
          </Flex>
        </form>
      </Flex>
    </Paper>
  );
}
