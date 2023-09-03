import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  PasswordInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { Customer, CustomerSignin } from '@commercetools/platform-sdk';
import { useAppDispatch, useAppSelector } from '../../hooks';
import userSelector from '../../store/selectors';
import { validatePassword } from '../../utils/field-validation';
import { changePassword, signIn } from '../../store/slices/userSlice';
import { PasswordChangeFormValues } from '../../types';

export type PasswordModalProps = {
  opened: boolean;
  close: () => void;
};

function PasswordModal({ opened, close }: PasswordModalProps) {
  const { loading, error } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const { getInputProps, onSubmit, setFieldError } = useForm<PasswordChangeFormValues>({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },

    validate: {
      currentPassword: (value) => validatePassword(value),
      newPassword: (value) => validatePassword(value),
    },

    validateInputOnChange: true,
  });

  useEffect(() => {
    if (error === 'The given current password does not match.') {
      setFieldError('currentPassword', error);
    }
  }, [error, setFieldError]);

  const handleSubmit = ({
    currentPassword,
    newPassword,
  }: PasswordChangeFormValues) => {
    const newPasswordData = {
      newPassword,
      currentPassword,
    };
    dispatch(changePassword(newPasswordData))
      .unwrap()
      .then((responseCustomer: Customer | undefined) => {
        close();
        if (responseCustomer) {
          const authUser: CustomerSignin = {
            password: newPassword,
            email: responseCustomer.email,
          };
          dispatch(signIn(authUser));
        }
        alert('The password has been successfully changed');
      })
      .catch(console.log);
  };

  return (
    <Modal title="Password changing" opened={opened} onClose={close} centered>
      <Box maw={340} mx="auto">
        <LoadingOverlay
          loaderProps={{ size: 'lg', color: 'orange' }}
          overlayOpacity={0.5}
          overlayColor="#c5c5c5"
          visible={loading}
          overlayBlur={2}
        />
        <form onSubmit={onSubmit(handleSubmit)}>
          <PasswordInput
            data-autofocus
            label="Password"
            placeholder="Password"
            {...getInputProps('currentPassword')}
          />

          <PasswordInput
            mt="sm"
            label="New password"
            placeholder="New password"
            {...getInputProps('newPassword')}
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
