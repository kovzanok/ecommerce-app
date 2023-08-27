import { Navigate } from 'react-router-dom';
import {
  Button, Flex, Grid, Paper, TextInput, Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { CustomerUpdateAction } from '@commercetools/platform-sdk';
import { dateConverter } from '../../utils';
import userSelector from '../../store/selectors';
import { useAppDispatch, useAppSelector, useTitle } from '../../hooks';
import { PersonalInfoFormValues } from '../../types';
import { approveChanges } from '../../store/slices/userSlice';
import { useDisabledStyles } from '../../utils/const';
import {
  validateBirthday,
  validateEmail,
  validateString,
} from '../../utils/field-validation';
import RightSection from '../../components/right-section';

export default function UserPage() {
  const matches = useMediaQuery('(max-width: 48em)');
  const dispatch = useAppDispatch();
  useTitle('Personal Info');

  const { user } = useAppSelector(userSelector);
  const [isReadonly, setIsReadonly] = useState(true);

  if (!user) return <Navigate to="/login" />;

  const { customer } = user;

  const collectChanges = (
    values: PersonalInfoFormValues,
  ): CustomerUpdateAction[] => {
    setIsReadonly(true);

    return [
      {
        action: 'setFirstName',
        firstName: values.firstName || '',
      },
      {
        action: 'setLastName',
        lastName: values.lastName || '',
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: dateConverter(new Date(values.dateOfBirthday || '')),
      },
    ];
  };

  const {
    onSubmit,
    getInputProps,
    setFieldValue,
    values: formValues,
  } = useForm<PersonalInfoFormValues>({
    initialValues: {
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      dateOfBirthday: new Date(customer.dateOfBirth || ''),
      email: customer.email || '',
    },
    validate: {
      firstName: (val) => validateString(val),
      lastName: (val) => validateString(val),
      dateOfBirthday: (val) => validateBirthday(val.toString()),
      email: (val) => validateEmail(val),
    },

    validateInputOnChange: true,
  });

  const handleSubmit = () => {
    const vals = collectChanges(formValues);
    dispatch(approveChanges(vals))
      .unwrap()
      .then(() => alert('Изменено'))
      .catch(console.log);
  };

  const { classes } = useDisabledStyles();

  return (
    <div>
      <Paper>
        <Title mb={20} mt="xl" order={3} size={matches ? 'h4' : 'h3'}>
          Personal Info
        </Title>
        <form onSubmit={onSubmit(handleSubmit)}>
          <Flex direction="column" justify="center" gap={10}>
            <Grid justify="space-evenly">
              <Grid.Col span={4}>
                <TextInput
                  w="100%"
                  placeholder="Vasya"
                  disabled={isReadonly}
                  rightSection={(
                    <RightSection
                      typeOfValue="firstName"
                      setFieldValue={setFieldValue}
                      formValue={formValues.firstName}
                      customerValue={customer.firstName}
                    />
                  )}
                  classNames={{
                    input: classes.input,
                  }}
                  label="First name"
                  {...getInputProps('firstName')}
                />
                <TextInput
                  disabled={isReadonly}
                  classNames={{
                    input: classes.input,
                  }}
                  rightSection={(
                    <RightSection
                      typeOfValue="lastName"
                      setFieldValue={setFieldValue}
                      formValue={formValues.lastName}
                      customerValue={customer.lastName}
                    />
                  )}
                  w="100%"
                  placeholder="Pupkin"
                  {...getInputProps('lastName')}
                  label="Last name"
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  disabled={isReadonly}
                  classNames={{
                    input: classes.input,
                  }}
                  rightSection={(
                    <RightSection
                      typeOfValue="email"
                      setFieldValue={setFieldValue}
                      formValue={formValues.email}
                      customerValue={customer.email}
                    />
                  )}
                  w="100%"
                  placeholder="example@email.com"
                  {...getInputProps('email')}
                  label="Email"
                />
                <DateInput
                  disabled={isReadonly}
                  classNames={{
                    input: classes.input,
                  }}
                  rightSection={(
                    <RightSection
                      typeOfValue="dateOfBirthday"
                      setFieldValue={setFieldValue}
                      formValue={formValues.dateOfBirthday}
                      customerValue={customer.dateOfBirth}
                    />
                  )}
                  w="100%"
                  {...getInputProps('dateOfBirthday')}
                  valueFormat="YYYY-MM-DD"
                  label="Birthday"
                  placeholder="1974-01-01"
                />
              </Grid.Col>
            </Grid>
            <Button
              onClick={() => {
                setIsReadonly(!isReadonly);
              }}
              type={isReadonly ? 'submit' : 'button'}
              m="auto"
              mt={30}
              w={matches ? '100%' : '40%'}
              color="orange"
              size="md"
            >
              {isReadonly ? 'Edit' : 'Save'}
            </Button>
          </Flex>
        </form>
      </Paper>
    </div>
  );
}
