import { Navigate } from 'react-router-dom';
import {
  Box, Button, Flex, Paper, TextInput, Title,
} from '@mantine/core';

import { DateInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { CustomerUpdateAction } from '@commercetools/platform-sdk';
import getCountriesArray, { dateConverter } from '../../utils';
import userSelector from '../../store/selectors';
import { useAppDispatch, useAppSelector, useTitle } from '../../hooks';

import { Country, ProfileFormValues } from '../../types';
import { approveChanges, resetError } from '../../store/slices/userSlice';
import AddressItem from '../../components/address-item';
import { useDisabledStyles } from '../../utils/const';
import { validateBirthday, validateString } from '../../utils/field-validation';
import RightSection from '../../components/right-section';

export default function UserPage() {
  const matches = useMediaQuery('(max-width: 48em)');
  const dispatch = useAppDispatch();
  useTitle('Profile');

  const { user } = useAppSelector(userSelector);
  const [isReadonly, setIsReadonly] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    setCountries(getCountriesArray());
    return () => {
      dispatch(resetError());
    };
  }, []);

  if (!user) return <Navigate to="/login" />;

  const { customer } = user;

  const collectChanges = (
    values: ProfileFormValues,
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
  } = useForm<ProfileFormValues>({
    initialValues: {
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      dateOfBirthday: new Date(customer.dateOfBirth || ''),
    },
    validate: {
      firstName: (val) => validateString(val),
      lastName: (val) => validateString(val),
      dateOfBirthday: (val) => validateBirthday(val.toString()),
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
        <form onSubmit={onSubmit(handleSubmit)}>
          <Flex direction="column" justify="center" gap={10}>
            <Flex direction={matches ? 'column' : 'row'} gap={20}>
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
            </Flex>

            <Flex gap={20} direction={matches ? 'column' : 'row'}>
              <Box w="100%">
                <Title mt="xl" order={3} size={matches ? 'h4' : 'h3'}>
                  Addresses
                </Title>
                <Paper mt="xs" shadow="xs" p="xs">
                  <Box>
                    {customer.addresses.map((adr) => (
                      <AddressItem
                        key={adr.id}
                        address={adr}
                        countries={countries}
                        defaultShipping={
                          customer.defaultShippingAddressId === adr.id
                        }
                        defaultBilling={
                          customer.defaultBillingAddressId === adr.id
                        }
                        isShipping={
                          customer.shippingAddressIds
                          && customer.shippingAddressIds.includes(adr.id || '')
                        }
                        isBilling={
                          customer.billingAddressIds
                          && customer.billingAddressIds.includes(adr.id || '')
                        }
                      />
                    ))}
                  </Box>
                </Paper>
              </Box>
            </Flex>

            <Button
              onClick={() => {
                setIsReadonly(!isReadonly);
              }}
              type={isReadonly ? 'submit' : 'button'}
              m="auto"
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
