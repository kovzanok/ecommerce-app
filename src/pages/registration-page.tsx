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
import { IconAt } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

function Registration() {
  const [opened, { toggle }] = useDisclosure(true);

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

  return (
    <Paper mt="xs" shadow="xs" p="xs" maw={600} mx="auto">
      <Title align="center" order={1} size="h1">
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
            icon={<IconAt size="1rem" />}
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

                <Switch label="Set shipping address as default" />
              </Flex>
            </Paper>
          </Box>

          <Checkbox
            mt="xs"
            label="Stay the same address for billing"
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

                <Switch label="Set billing address as default" />
              </Flex>
            </Paper>
          </Collapse>

          <Button type="submit">Sign up</Button>
        </Flex>
      </form>
    </Paper>
  );
}

export default Registration;
