import { Navigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Paper,
  PasswordInput,
  Select,
  TextInput,
  Title,
} from '@mantine/core';
import { IconMail } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import getCountriesArray, { getAddresses } from '../../utils';
import userSelector from '../../store/selectors';
import { useAppDispatch, useAppSelector, useTitle } from '../../hooks';
import {
  validateBirthday,
  validateEmail,
  validatePassword,
  validatePostalCode,
  validateStreet,
  validateString,
} from '../../utils/field-validation';
import { Country } from '../../types';
import { resetError } from '../../store/slices/userSlice';

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

  const addressValidation = {
    city: (val: string | undefined) => validateString(val || ''),
    streetName: (val: string | undefined) => validateStreet(val || ''),
  };

  if (!user) return <Navigate to="/login" />;

  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    addresses,
    billingAddressIds,
    shippingAddressIds,
  } = user.customer;

  const { getInputProps, values: formValues } = useForm({
    initialValues: {
      firstName,
      lastName,
      email,
      password,
      dateOfBirthday: new Date(dateOfBirth || ''),

      shippingAddresses: shippingAddressIds
        ? getAddresses(shippingAddressIds, addresses)
        : [],

      billingAddresses: billingAddressIds
        ? getAddresses(billingAddressIds, addresses)
        : [],
    },

    validate: {
      firstName: (val = '') => validateString(val),
      lastName: (val = '') => validateString(val),
      email: (val: string) => validateEmail(val),
      password: (val = '') => validatePassword(val),
      dateOfBirthday: (val: Date) => validateBirthday(val.toString()),
      shippingAddresses: {
        ...addressValidation,
        country: (val: string) => {
          if (val === '') {
            return 'Choose the country';
          }
          return null;
        },
        postalCode: (val: string | undefined, values, path) => {
          const index = +path.split('.')[1];

          const countryName = values.shippingAddresses[index].country;

          return validatePostalCode(val || '', countryName);
        },
      },

      billingAddresses: {
        ...addressValidation,
        country: (val: string) => {
          if (val === '') {
            return 'Choose the country';
          }
          return null;
        },
        postalCode: (val, values, path) => {
          const index = +path.split('.')[1];

          const countryName = values.billingAddresses[index].country;
          return validatePostalCode(val || '', countryName);
        },
      },
    },

    validateInputOnChange: true,
  });

  return (
    <div>
      <Paper>
        <form onSubmit={() => console.log('Output')}>
          <Flex direction="column" justify="center" gap={10}>
            <Flex direction={matches ? 'column' : 'row'} gap={20}>
              <TextInput
                readOnly={isReadonly}
                w="100%"
                withAsterisk
                placeholder="Vasya"
                label="First name"
                {...getInputProps('firstName')}
              />
              <TextInput
                readOnly={isReadonly}
                w="100%"
                withAsterisk
                placeholder="Pupkin"
                label="Last name"
                {...getInputProps('lastName')}
              />
            </Flex>

            <Flex direction={matches ? 'column' : 'row'} gap={20}>
              <TextInput
                readOnly={isReadonly}
                w="100%"
                withAsterisk
                placeholder="example@gmail.com"
                label="Email"
                icon={<IconMail size="1rem" />}
                {...getInputProps('email')}
              />
              <PasswordInput
                readOnly={isReadonly}
                w="100%"
                withAsterisk
                label="Password"
                {...getInputProps('password')}
              />
              <DateInput
                readOnly={isReadonly}
                w="100%"
                withAsterisk
                valueFormat="YYYY-MM-DD"
                label="Birthday"
                placeholder="1974-01-01"
                {...getInputProps('dateOfBirthday')}
              />
            </Flex>

            <Flex gap={20} direction={matches ? 'column' : 'row'}>
              <Box w="100%">
                <Title mt="xl" order={3} size={matches ? 'h4' : 'h3'}>
                  Shipping addresses
                </Title>
                <Paper mt="xs" shadow="xs" p="xs">
                  <Flex gap={20} direction="row">
                    {formValues.shippingAddresses.map((adr, ind) => (
                      <Flex direction="column" gap={10} key={adr.id}>
                        <TextInput
                          withAsterisk
                          placeholder="Lenin st. 12-01"
                          label="Street"
                          {...getInputProps(
                            `shippingAddresses.${ind}.streetName`,
                          )}
                        />
                        <TextInput
                          withAsterisk
                          placeholder="Minsk"
                          label="City"
                          {...getInputProps(`shippingAddresses.${ind}.city`)}
                        />
                        <Select
                          withAsterisk
                          placeholder="Belarus"
                          label="Country"
                          searchable
                          data={countries}
                          {...getInputProps(`shippingAddresses.${ind}.country`)}
                        />
                        <TextInput
                          withAsterisk
                          placeholder="AF-35A"
                          label="Postal code"
                          {...getInputProps(
                            `shippingAddresses.${ind}.postalCode`,
                          )}
                        />
                      </Flex>
                    ))}
                  </Flex>
                </Paper>
              </Box>
            </Flex>
            <Flex gap={20} direction={matches ? 'column' : 'row'}>
              <Box w="100%">
                <Title mt="xl" order={3} size={matches ? 'h4' : 'h3'}>
                  Billing addresses
                </Title>
                <Paper mt="xs" shadow="xs" p="xs">
                  <Flex gap={20} direction="row">
                    {formValues.billingAddresses.map((adr, ind) => (
                      <Flex direction="column" gap={10} key={adr.id}>
                        <TextInput
                          withAsterisk
                          placeholder="Lenin st. 12-01"
                          label="Street"
                          {...getInputProps(
                            `billingAddresses.${ind}.streetName`,
                          )}
                        />
                        <TextInput
                          withAsterisk
                          placeholder="Minsk"
                          label="City"
                          {...getInputProps(`billingAddresses.${ind}.city`)}
                        />
                        <Select
                          withAsterisk
                          placeholder="Belarus"
                          label="Country"
                          searchable
                          data={countries}
                          {...getInputProps(`billingAddresses.${ind}.country`)}
                        />
                        <TextInput
                          withAsterisk
                          placeholder="AF-35A"
                          label="Postal code"
                          {...getInputProps(
                            `billingAddresses.${ind}.postalCode`,
                          )}
                        />
                      </Flex>
                    ))}
                  </Flex>
                </Paper>
              </Box>
            </Flex>

            <Button
              type="button"
              m="auto"
              w={matches ? '100%' : '40%'}
              color="orange"
              size="md"
              onClick={() => setIsReadonly(!isReadonly)}
            >
              {isReadonly ? 'Edit' : 'Save'}
            </Button>
          </Flex>
        </form>
      </Paper>
    </div>
  );
}
