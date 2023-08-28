import {
  Box, Button, Group, Modal, PasswordInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import userSelector from '../../store/selectors';
import { validatePassword } from '../../utils/field-validation';

type PasswordModalProps = {
  opened: boolean;
  close: () => void;
};

function PasswordModal({ opened, close }: PasswordModalProps) {
  const { error } = useAppSelector(userSelector);
  const { setFieldError, getInputProps, onSubmit } = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },

    validate: {
      password: (value) => validatePassword(value),
      confirmPassword: (value) => validatePassword(value),
    },

    validateInputOnChange: true,
  });

  useEffect(() => {
    setFieldError('password', error);
  }, [error]);

  return (
    <Modal opened={opened} onClose={close} centered>
      <Box maw={340} mx="auto">
        <form onSubmit={onSubmit((values) => console.log(values))}>
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...getInputProps('password')}
          />

          <PasswordInput
            mt="sm"
            label="New password"
            placeholder="New password"
            {...getInputProps('confirmPassword')}
          />

          <Group position="center" mt="md">
            <Button color="orange" type="submit">
              Apply
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}

export default PasswordModal;
