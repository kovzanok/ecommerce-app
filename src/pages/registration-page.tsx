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
import { React, useState } from 'react';

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

    if (SPECIAL_CHARACTERS_REGULAR.test(val)) {
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
    if (CURRENT_AGE(val) <= AGE_REQUIREMENT) {
      return 'A valid date input ensuring the user is above a 13';
    }

    return null;
  };

  const postalCodeValidation = (val: string): ValidationFunc => {
    console.log(val);
    return val;
  };

  const countryValidation = (val: string): ValidationFunc => {
    console.log(val);

    return val;
  };

  const [opened, { toggle }] = useDisclosure(true);

  const [isBillingAddressChecked, setIsBillingAddressChecked] = useState<boolean>(false);

  const addressValidation = {
    country: (val: string) => countryValidation(val),
    postalCode: (val: string) => postalCodeValidation(val),
    city: (val: string) => stringValidation(val),
    street: (val: string) => streetValidation(val),
  };

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
            placeholder="Vasya"
            label="First name"
            {...form.getInputProps('firstName')}
          />
          <TextInput
            placeholder="Pupkin"
            label="Last name"
            {...form.getInputProps('lastName')}
          />
          <TextInput
            placeholder="example@gmail.com"
            label="Email"
            icon={<IconMail size="1rem" />}
            {...form.getInputProps('email')}
          />
          <PasswordInput label="Password" {...form.getInputProps('password')} />
          <DateInput
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
                  placeholder="Lenin st. 12-01"
                  label="Street"
                  {...form.getInputProps('shippingAddress.street')}
                />
                <TextInput
                  placeholder="Minsk"
                  label="City"
                  {...form.getInputProps('shippingAddress.city')}
                />
                <Select
                  placeholder="Belarus"
                  label="Country"
                  data={[]}
                  {...form.getInputProps('shippingAddress.country')}
                />
                <TextInput
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
                  placeholder="Billing st. 12-01"
                  label="Street"
                  {...form.getInputProps('billingAddress.street')}
                />
                <TextInput
                  placeholder="Minsk"
                  label="City"
                  {...form.getInputProps('billingAddress.city')}
                />
                <Select
                  placeholder="Belarus"
                  label="Country"
                  data={[]}
                  {...form.getInputProps('billingAddress.country')}
                />
                <TextInput
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
