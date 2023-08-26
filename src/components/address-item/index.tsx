import { Address } from '@commercetools/platform-sdk';
import {
  Checkbox, Flex, Paper, Radio, Select, TextInput,
} from '@mantine/core';
import React from 'react';
import { Country } from '../../types';

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
          name="defaultShipping"
          value="defaultShipping"
          defaultChecked={defaultShipping}
          disabled
          label="Default shipping address"
        />
        <Radio
          name="defaultBilling"
          value="defaultBilling"
          defaultChecked={defaultBilling}
          disabled
          label="Default billing address"
        />
      </Flex>
      <Paper w="50%" mt="xs" shadow="xs" p="xs">
        <Flex direction="column" gap={10}>
          <Flex direction="row" gap={10} justify="space-between">
            <TextInput
              placeholder="Lenin st. 12-01"
              label="Street"
              readOnly
              value={address.streetName}
              w="100%"
            />
            <TextInput
              withAsterisk
              placeholder="Minsk"
              label="City"
              readOnly
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
              readOnly
              value={address.country}
              w="100%"
            />
            <TextInput
              withAsterisk
              placeholder="AF-35A"
              label="Postal code"
              readOnly
              value={address.postalCode}
              w="100%"
            />
          </Flex>
          <Flex direction="row" gap={10} justify="space-between">
            <Checkbox
              label="Shipping address"
              checked={isShipping}
              readOnly
              w="100%"
            />
            <Checkbox
              label="Billing address"
              checked={isBilling}
              readOnly
              w="100%"
            />
          </Flex>
        </Flex>
      </Paper>
    </Flex>
  );
}
