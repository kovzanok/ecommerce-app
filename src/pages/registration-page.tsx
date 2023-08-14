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
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
import getCountriesArray from '../utils/countries';
import { Country } from '../types';

type ValidationFunc = string | null;

function Registration() {
  const SPECIAL_CHARACTERS_REGULAR = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  const EMAIL_REGULAR = /^\S+@\S+$/;
  const DIGIT_REGULAR = /\d/;
  const LOWER_CASE_REGULAR = /[a-z]/;
  const PASSWORD_MIN_LENGTH = 8;
  const AGE_REQUIREMENT = 13;
  const CURRENT_AGE = (dateString: string): number => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  };

  const stringValidation = (val: string): ValidationFunc => {
    if (val.length === 0) {
      return 'This field must contain at least one character';
    }

    if (SPECIAL_CHARACTERS_REGULAR.test(val) || DIGIT_REGULAR.test(val)) {
      return 'This field must contain no special characters or numbers';
    }

    return null;
  };

  const streetValidation = (val: string): ValidationFunc => {
    if (val.length === 0) {
      return 'This field must contain at least one character';
    }

    return null;
  };

  const emailValidation = (val: string): ValidationFunc => {
    if (!EMAIL_REGULAR.test(val)) {
      return 'This field must have a properly formatted email address (e.g., example@email.com)';
    }

    return null;
  };

  const passwordValidation = (val: string): ValidationFunc => {
    if (val.length < PASSWORD_MIN_LENGTH) {
      return 'Password must have minimum 8 characters';
    }

    if (!LOWER_CASE_REGULAR.test(val)) {
      return 'Password must have at least 1 lowercase letter';
    }

    if (!DIGIT_REGULAR.test(val)) {
      return 'Password must have at least one number';
    }

    return null;
  };

  const birthdayValidation = (val: string): ValidationFunc => {
    if (val.length === 0) {
      return 'Choose your age';
    }

    if (CURRENT_AGE(val) <= AGE_REQUIREMENT) {
      return 'A valid date input ensuring the user is above a 13';
    }

    return null;
  };

  const postalCodeValidation = (
    val: string,
    country: string,
  ): ValidationFunc => {
    const isPostalCorrect = postcodeValidatorExistsForCountry(country)
      && postcodeValidator(val, country);
    if (!isPostalCorrect) {
      return 'This postal code is incorrect!';
    }
    return null;
  };

  const [countries, setCountries] = useState<Country[]>([]);

  const [billingCountry, setBillingCountry] = useState(false);
  const [shippingCountry, setShippingCountry] = useState(false);

  useEffect(() => {
    setCountries(getCountriesArray());
  }, []);

  const [opened, { toggle }] = useDisclosure(true);

  const [isBillingAddressChecked, setIsBillingAddressChecked] = useState<boolean>(false);

  const addressValidation = {
    city: (val: string) => stringValidation(val),
    street: (val: string) => streetValidation(val),
  };

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

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dateOfBirthday: '',

      shippingAddress: {
        country: '',
        postalCode: '',
        city: '',
        street: '',
      },

      billingAddress: {
        country: '',
        postalCode: '',
        city: '',
        street: '',
      },
    },

    validate: {
      firstName: (val: string) => stringValidation(val),
      lastName: (val: string) => stringValidation(val),
      email: (val: string) => emailValidation(val),
      password: (val: string) => passwordValidation(val),
      dateOfBirthday: (val: string) => birthdayValidation(val),
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
          return postalCodeValidation(val, country);
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
          return postalCodeValidation(val, country);
        },
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
            valueFormat="DD/MM/YY"
            label="Birthday"
            placeholder="01/01/1974"
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
                  disabled={!shippingCountry}
                  placeholder="AF-35A"
                  label="Postal code"
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
                  disabled={!billingCountry}
                  placeholder="AF-35A"
                  label="Postal code"
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
