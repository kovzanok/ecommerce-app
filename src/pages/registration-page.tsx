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
  const [opened, { toggle }] = useDisclosure(true);

  const [isBillingAddressChecked, setIsBillingAddressChecked] = useState<boolean>(false);

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
      <form>
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
                  {...form.getInputProps('address.street')}
                />
                <TextInput
                  placeholder="Minsk"
                  label="City"
                  {...form.getInputProps('address.city')}
                />
                <TextInput
                  placeholder="AF-35A"
                  label="Postal code"
                  {...form.getInputProps('address.postalCode')}
                />
                <Select
                  placeholder="Belarus"
                  label="Country"
                  data={[]}
                  {...form.getInputProps('address.country')}
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
                <TextInput
                  placeholder="AF-35A"
                  label="Postal code"
                  {...form.getInputProps('billingAddress.postalCode')}
                />
                <Select
                  placeholder="Belarus"
                  label="Country"
                  data={[]}
                  {...form.getInputProps('billingAddress.country')}
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
