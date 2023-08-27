import { Navigate } from 'react-router-dom';
import {
  Button, Flex, Grid, Paper, TextInput, Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { CustomerUpdateAction } from '@commercetools/platform-sdk';
import { areNotValuesEquals, dateConverter } from '../../utils';
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

  const { user, error } = useAppSelector(userSelector);
  const [isReadonly, setIsReadonly] = useState(true);

  if (!user) return <Navigate to="/login" />;

  const { customer } = user;

  const collectChanges = (
    values: PersonalInfoFormValues,
  ): CustomerUpdateAction[] => {
    const customerUpdateActionArray: CustomerUpdateAction[] = [];

    if (areNotValuesEquals(values.firstName, customer.firstName)) {
      customerUpdateActionArray.push({
        action: 'setFirstName',
        firstName: values.firstName || '',
      });
    }

    if (areNotValuesEquals(values.lastName, customer.lastName)) {
      customerUpdateActionArray.push({
        action: 'setLastName',
        lastName: values.lastName || '',
      });
    }

    if (areNotValuesEquals(values.dateOfBirth, customer.dateOfBirth)) {
      customerUpdateActionArray.push({
        action: 'setDateOfBirth',
        dateOfBirth: dateConverter(new Date(values.dateOfBirth || '')),
      });
    }

    if (areNotValuesEquals(values.email, customer.email)) {
      customerUpdateActionArray.push({
        action: 'changeEmail',
        email: values.email || '',
      });
    }

    return customerUpdateActionArray;
  };

  const {
    onSubmit,
    getInputProps,
    setFieldError,
    setFieldValue,
    values: formValues,
  } = useForm<PersonalInfoFormValues>({
    initialValues: {
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      dateOfBirth: new Date(customer.dateOfBirth || ''),
      email: customer.email || '',
    },
    validate: {
      firstName: (val) => validateString(val),
      lastName: (val) => validateString(val),
      dateOfBirth: (val) => validateBirthday(dateConverter(val)),
      email: (val) => validateEmail(val),
    },

    validateInputOnChange: true,
  });

  const handleSubmit = () => {
    const transformedValues = collectChanges(formValues);

    setIsReadonly(!isReadonly);
    if (transformedValues.length) {
      dispatch(approveChanges(transformedValues))
        .unwrap()
        .then(() => {
          const message = `${transformedValues.map((action) => action.action.slice(
            action.action
              .split('')
              .findIndex((symbol) => symbol === symbol.toUpperCase()),
          ))} successfully changed`;
          alert(message);
        })
        .catch(console.log);
    }
  };

  useEffect(() => {
    if (error) {
      setFieldError('email', error);
      setIsReadonly(false);
    }
  }, [error, setFieldError]);

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
                      typeOfValue="dateOfBirth"
                      setFieldValue={setFieldValue}
                      formValue={formValues.dateOfBirth}
                      customerValue={customer.dateOfBirth}
                    />
                  )}
                  w="100%"
                  {...getInputProps('dateOfBirth')}
                  valueFormat="YYYY-MM-DD"
                  label="Birthday"
                  placeholder="1974-01-01"
                />
              </Grid.Col>
            </Grid>
            <Button
              type="submit"
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
