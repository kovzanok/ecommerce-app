import { Address } from '@commercetools/platform-sdk';
import {
  Checkbox, Flex, Paper, Radio, Select, TextInput,
} from '@mantine/core';
import { Country } from '../../types';
import { useDisabledStyles } from '../../utils/const';

type AddressProps = {
  address: Address;
  countries: Country[];
  defaultBilling: boolean;
  defaultShipping: boolean;
  isShipping: boolean | undefined;
  isBilling: boolean | undefined;
};

export default function AddressItem({
  address,
  countries,
  defaultBilling,
  defaultShipping,
  isShipping,
  isBilling,
}: AddressProps) {
  const { classes } = useDisabledStyles();

  return (
    <Flex
      direction="row"
      justify="space-between"
      gap={10}
      key={address.id}
      pb={10}
      style={{ borderBottom: '2px solid #ced4da' }}
    >
      <Flex direction="row" gap={100} align="center" justify="center" m="auto">
        <Radio
          name="defaultShippingAddress"
          defaultChecked={defaultShipping}
          label="Default shipping address"
          disabled
          classNames={{
            radio: classes.input,
            label: classes.label,
          }}
          value="defaultShipping"
        />
        <Radio
          name="defaultBillingAddress"
          defaultChecked={defaultBilling}
          label="Default billing address"
          disabled
          classNames={{
            radio: classes.input,
            label: classes.label,
          }}
          value="defaultBilling"
        />
      </Flex>
      <Paper w="50%" mt="xs" shadow="xs" p="xs">
        <Flex direction="column" gap={10}>
          <Flex direction="row" gap={10} justify="space-between">
            <TextInput
              placeholder="Lenin st. 12-01"
              label="Street"
              disabled
              classNames={{
                input: classes.input,
                label: classes.label,
              }}
              value={address.streetName}
              w="100%"
            />
            <TextInput
              withAsterisk
              placeholder="Minsk"
              label="City"
              disabled
              classNames={{
                input: classes.input,
                label: classes.label,
              }}
              value={address.city}
              w="100%"
            />
          </Flex>
          <Flex direction="row" gap={10} justify="space-between">
            <Select
              placeholder="Belarus"
              label="Country"
              searchable
              data={countries}
              disabled
              classNames={{
                input: classes.input,
                label: classes.label,
              }}
              value={address.country}
              w="100%"
            />
            <TextInput
              withAsterisk
              placeholder="AF-35A"
              label="Postal code"
              disabled
              classNames={{
                input: classes.input,
                label: classes.label,
              }}
              value={address.postalCode}
              w="100%"
            />
          </Flex>
          <Flex direction="row" gap={10} justify="space-between">
            <Checkbox
              label="Shipping address"
              checked={isShipping}
              disabled
              classNames={{
                input: classes.input,
                label: classes.label,
              }}
              w="100%"
            />
            <Checkbox
              label="Billing address"
              checked={isBilling}
              disabled
              classNames={{
                input: classes.input,
                label: classes.label,
              }}
              w="100%"
            />
          </Flex>
        </Flex>
      </Paper>
    </Flex>
  );
}
