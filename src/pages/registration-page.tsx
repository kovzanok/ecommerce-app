import {
  Switch,
  Button,
  Box,
  Title,
  Collapse,
  Flex,
  Checkbox,
  Select,
  Paper,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconMail } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import getCountriesArray from '../utils';
import { Country } from '../types';
import {
  validateBirthday,
  validateEmail,
  validatePassword,
  validateStreet,
  validateString,
  validatePostalCode,
} from '../utils/field-validation';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirthday: string;

  shippingAddress: {
    country: string;
    postalCode: string;
    city: string;
    street: string;
  };

  billingAddress: {
    country: string;
    postalCode: string;
    city: string;
    street: string;
  };
}

function Registration() {
  const [countries, setCountries] = useState<Country[]>([]);

  const [billingCountry, setBillingCountry] = useState(false);
  const [shippingCountry, setShippingCountry] = useState(false);

  useEffect(() => {
    setCountries(getCountriesArray());
  }, []);

  const [opened, { toggle }] = useDisclosure(true);

  const [isBillingAddressChecked, setIsBillingAddressChecked] = useState<boolean>(false);

  const addressValidation = {
    city: (val: string) => validateString(val),
    street: (val: string) => validateStreet(val),
  };

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dateOfBirthday: '',

      shippingAddress: {
        ...addressValidation,
        country: (val: string) => {
          if (val === '') {
            return 'Choose the country';
          }
          setShippingCountry(true);
          return null;
        },
        postalCode: (val: string, values: FormValues) => {
          const { country } = values.shippingAddress;
          return validatePostalCode(val, country);
        },
      },

      billingAddress: {
        ...addressValidation,
        country: (val: string) => {
          if (val === '') {
            return 'Choose the country';
          }
          setBillingCountry(true);
          return null;
        },
        postalCode: (val: string, values: FormValues) => {
          const { country } = values.billingAddress;
          return validatePostalCode(val, country);
        },
      },
    },

    validate: {
      firstName: (val: string) => validateString(val),
      lastName: (val: string) => validateString(val),
      email: (val: string) => validateEmail(val),
      password: (val: string) => validatePassword(val),
      dateOfBirthday: (val: string) => validateBirthday(val),
      shippingAddress: {
        ...addressValidation,
      },
      billingAddress: {
        ...addressValidation,
      },
    },

    validateInputOnChange: true,
  });

  const billingSwitch = (
    <Switch
      onChange={() => {
        setIsBillingAddressChecked(!isBillingAddressChecked);
      }}
      checked={isBillingAddressChecked}
      label="Set as default billing address"
    />
  );

  return (
    <Paper
      mt="xs"
      shadow="xs"
      style={{ border: '1px solid orange' }}
      p="xs"
      maw={600}
      mx="auto"
    >
      <Title align="center" color="orange" order={1} size="h1">
        Registration
      </Title>
      <form onSubmit={form.onSubmit(console.log)}>
        <Flex direction="column" justify="center" gap={10}>
          <TextInput
            withAsterisk
            placeholder="Vasya"
            label="First name"
            {...form.getInputProps('firstName')}
          />
          <TextInput
            withAsterisk
            placeholder="Pupkin"
            label="Last name"
            {...form.getInputProps('lastName')}
          />
          <TextInput
            withAsterisk
            placeholder="example@gmail.com"
            label="Email"
            icon={<IconMail size="1rem" />}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            {...form.getInputProps('password')}
          />
          <DateInput
            withAsterisk
            valueFormat="YYYY-MM-DD"
            label="Birthday"
            placeholder="1974-01-01"
            {...form.getInputProps('dateOfBirthday')}
          />
          <Box>
            <Title mt="xl" order={3} size="h3">
              Shipping address
            </Title>
            <Paper mt="xs" shadow="xs" p="xs">
              <Flex direction="column" gap={10}>
                <TextInput
                  withAsterisk
                  placeholder="Lenin st. 12-01"
                  label="Street"
                  {...form.getInputProps('shippingAddress.street')}
                />
                <TextInput
                  withAsterisk
                  placeholder="Minsk"
                  label="City"
                  {...form.getInputProps('shippingAddress.city')}
                />
                <Select
                  withAsterisk
                  placeholder="Belarus"
                  label="Country"
                  searchable
                  data={countries}
                  {...form.getInputProps('shippingAddress.country')}
                />
                <TextInput
                  withAsterisk
                  placeholder="AF-35A"
                  label="Postal code"
                  disabled={!shippingCountry}
                  {...form.getInputProps('shippingAddress.postalCode')}
                />

                <Flex justify="space-between">
                  <Switch label="Set as default shipping address" />
                  {!opened && billingSwitch}
                </Flex>
              </Flex>
            </Paper>
          </Box>
          <Checkbox
            mt="xs"
            label="Use the same address for billing"
            onChange={toggle}
          />
          <Collapse in={opened}>
            <Title mt="xl" order={3} size="h3">
              Billing address
            </Title>
            <Paper mt="xs" shadow="xs" p="xs">
              <Flex direction="column" gap={10}>
                <TextInput
                  withAsterisk
                  placeholder="Billing st. 12-01"
                  label="Street"
                  {...form.getInputProps('billingAddress.street')}
                />
                <TextInput
                  withAsterisk
                  placeholder="Minsk"
                  label="City"
                  {...form.getInputProps('billingAddress.city')}
                />
                <Select
                  withAsterisk
                  placeholder="Belarus"
                  label="Country"
                  searchable
                  data={countries}
                  {...form.getInputProps('billingAddress.country')}
                />
                <TextInput
                  withAsterisk
                  placeholder="AF-35A"
                  label="Postal code"
                  disabled={!billingCountry}
                  {...form.getInputProps('billingAddress.postalCode')}
                />

                {opened && billingSwitch}
              </Flex>
            </Paper>
          </Collapse>

          <Button type="submit" m="auto" w="40%" color="orange" size="md">
            Sign up
          </Button>
        </Flex>
      </form>
    </Paper>
  );
}

export default Registration;
