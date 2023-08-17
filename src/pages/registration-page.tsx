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
  LoadingOverlay,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconMail } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { CustomerDraft } from '@commercetools/platform-sdk';
import getCountriesArray, { transformRegistrationData } from '../utils';
import { Country, FormValues } from '../types';
import {
  validateBirthday,
  validateEmail,
  validatePassword,
  validateStreet,
  validateString,
  validatePostalCode,
} from '../utils/field-validation';
import { signUp } from '../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import userSelector from '../store/selectors';

function Registration() {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector(userSelector);
  const [countries, setCountries] = useState<Country[]>([]);

  const [billingCountry, setBillingCountry] = useState(false);
  const [shippingCountry, setShippingCountry] = useState(false);

  useEffect(() => {
    setCountries(getCountriesArray());
  }, []);

  const [opened, { toggle }] = useDisclosure(true);

  const addressValidation = {
    city: (val: string) => validateString(val),
    street: (val: string) => validateStreet(val),
  };

  const {
    onSubmit,
    getInputProps,
    setFieldValue,
    setFieldError,
    values: formValues,
  } = useForm({
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
        isAddressDefault: false,
      },
      billingAddress: {
        country: '',
        postalCode: '',
        city: '',
        street: '',
        isAddressDefault: false,
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

    validateInputOnChange: true,

    transformValues: (values) => transformRegistrationData(values, !opened),
  });

  useEffect(() => {
    setFieldError('email', error);
  }, [error]);

  const billingSwitch = (
    <Switch
      {...getInputProps('billingAddress.isAddressDefault')}
      checked={formValues.billingAddress.isAddressDefault}
      label="Set as default billing address"
    />
  );

  const { onChange: shippingCityHandle } = getInputProps(
    'shippingAddress.city',
  );

  const { onChange: billingCityHandle } = getInputProps('billingAddress.city');

  const { onChange: shippingStreetHandle } = getInputProps(
    'shippingAddress.street',
  );

  const { onChange: billingStreetHandle } = getInputProps(
    'billingAddress.street',
  );

  const { onChange: shippingCountryHandle } = getInputProps(
    'shippingAddress.country',
  );

  const { onChange: billingCountryHandle } = getInputProps(
    'billingAddress.country',
  );

  const { onChange: shippingPostalCodeHandle } = getInputProps(
    'shippingAddress.postalCode',
  );

  const { onChange: billingPostalCodeHandle } = getInputProps(
    'billingAddress.postalCode',
  );

  const modalMessage = 'Congratulations! Your account has been successfully created.';

  const handleSubmit = (values: CustomerDraft) => {
    dispatch(signUp(values))
      .unwrap()
      .then(() => alert(modalMessage));
  };

  return (
    <Paper
      mt="xs"
      shadow="xs"
      style={{ border: '1px solid orange', zIndex: 0 }}
      p="xs"
      maw={600}
      mx="auto"
      pos="relative"
    >
      <LoadingOverlay
        loaderProps={{ size: 'lg', color: 'orange' }}
        overlayOpacity={0.5}
        overlayColor="#c5c5c5"
        visible={loading}
        overlayBlur={2}
      />

      <Title align="center" color="orange" order={1} size="h1">
        Registration
      </Title>
      <form onSubmit={onSubmit(handleSubmit)}>
        <Flex direction="column" justify="center" gap={10}>
          <TextInput
            withAsterisk
            placeholder="Vasya"
            label="First name"
            {...getInputProps('firstName')}
          />
          <TextInput
            withAsterisk
            placeholder="Pupkin"
            label="Last name"
            {...getInputProps('lastName')}
          />
          <TextInput
            withAsterisk
            placeholder="example@gmail.com"
            label="Email"
            icon={<IconMail size="1rem" />}
            {...getInputProps('email')}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            {...getInputProps('password')}
          />
          <DateInput
            withAsterisk
            valueFormat="YYYY-MM-DD"
            label="Birthday"
            placeholder="1974-01-01"
            {...getInputProps('dateOfBirthday')}
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
                  {...getInputProps('shippingAddress.street')}
                  onChange={(event) => {
                    shippingStreetHandle(event);

                    if (!opened) billingStreetHandle(event);
                  }}
                />
                <TextInput
                  withAsterisk
                  placeholder="Minsk"
                  label="City"
                  {...getInputProps('shippingAddress.city')}
                  onChange={(event) => {
                    shippingCityHandle(event);

                    if (!opened) billingCityHandle(event);
                  }}
                />
                <Select
                  withAsterisk
                  placeholder="Belarus"
                  label="Country"
                  searchable
                  data={countries}
                  {...getInputProps('shippingAddress.country')}
                  onChange={(event) => {
                    shippingCountryHandle(event);

                    if (!opened) billingCountryHandle(event);
                  }}
                />
                <TextInput
                  withAsterisk
                  placeholder="AF-35A"
                  label="Postal code"
                  disabled={!shippingCountry}
                  {...getInputProps('shippingAddress.postalCode')}
                  onChange={(event) => {
                    shippingPostalCodeHandle(event);

                    if (!opened) billingPostalCodeHandle(event);
                  }}
                />

                <Flex justify="space-between">
                  <Switch
                    label="Set as default shipping address"
                    {...getInputProps('shippingAddress.isAddressDefault')}
                  />
                  {!opened && billingSwitch}
                </Flex>
              </Flex>
            </Paper>
          </Box>
          <Checkbox
            mt="xs"
            label="Use the same address for billing"
            onChange={() => {
              toggle();

              if (opened) {
                setFieldValue('billingAddress', {
                  ...formValues.shippingAddress,
                  isAddressDefault: formValues.billingAddress.isAddressDefault,
                });
              }
            }}
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
                  {...getInputProps('billingAddress.street')}
                  onChange={billingStreetHandle}
                />
                <TextInput
                  withAsterisk
                  placeholder="Minsk"
                  label="City"
                  {...getInputProps('billingAddress.city')}
                  onChange={billingCityHandle}
                />
                <Select
                  withAsterisk
                  placeholder="Belarus"
                  label="Country"
                  searchable
                  data={countries}
                  {...getInputProps('billingAddress.country')}
                  onChange={billingCountryHandle}
                />
                <TextInput
                  withAsterisk
                  placeholder="AF-35A"
                  label="Postal code"
                  disabled={!billingCountry}
                  {...getInputProps('billingAddress.postalCode')}
                  onChange={billingPostalCodeHandle}
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
