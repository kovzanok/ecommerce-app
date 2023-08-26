import { Navigate } from 'react-router-dom';
import {
  Box, Button, Flex, Paper, TextInput, Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import getCountriesArray from '../../utils';
import userSelector from '../../store/selectors';
import { useAppDispatch, useAppSelector, useTitle } from '../../hooks';

import { Country } from '../../types';
import { resetError } from '../../store/slices/userSlice';
import AddressItem from '../../components/address-item';
import { useDisabledStyles } from '../../utils/const';

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

  const { classes } = useDisabledStyles();

  return (
    <div>
      <Paper>
        <Flex direction="column" justify="center" gap={10}>
          <Flex direction={matches ? 'column' : 'row'} gap={20}>
            <TextInput
              w="100%"
              withAsterisk
              placeholder="Vasya"
              value={customer.firstName}
              disabled
              classNames={{
                input: classes.input,
              }}
              label="First name"
            />
            <TextInput
              disabled
              classNames={{
                input: classes.input,
              }}
              w="100%"
              withAsterisk
              placeholder="Pupkin"
              value={customer.lastName}
              label="Last name"
            />

            <DateInput
              disabled
              classNames={{
                input: classes.input,
              }}
              w="100%"
              withAsterisk
              valueFormat="YYYY-MM-DD"
              value={new Date(customer.dateOfBirth || '')}
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
      </Paper>
    </div>
  );
}
