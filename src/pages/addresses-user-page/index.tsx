import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import {
  Box, Button, Center, Flex, Paper, Title,
} from '@mantine/core';
import { Navigate } from 'react-router-dom';
import AddressItem from '../../components/address-item';
import { Country } from '../../types';
import getCountriesArray from '../../utils';
import { useAppDispatch, useAppSelector, useTitle } from '../../hooks';
import { resetError } from '../../store/slices/userSlice';
import userSelector from '../../store/selectors';

export default function AddressesUserPage() {
  const matches = useMediaQuery('(max-width: 48em)');
  const { user } = useAppSelector(userSelector);
  const [countries, setCountries] = useState<Country[]>([]);
  const dispatch = useAppDispatch();
  useTitle('Addresses Info');
  useEffect(() => {
    setCountries(getCountriesArray());
    return () => {
      dispatch(resetError());
    };
  }, []);
  if (!user) return <Navigate to="/login" />;
  const { customer } = user;

  const [editMode, setEditMode] = useState(false);

  return (
    <Flex gap={20} direction={matches ? 'column' : 'row'}>
      <Box w="100%">
        <Title mb={20} mt="xl" order={3} size={matches ? 'h4' : 'h3'}>
          Addresses
        </Title>
        <Paper mt="xs" shadow="xs" p="xs">
          <Box>
            {customer.addresses.map((adr) => (
              <AddressItem
                key={adr.id}
                address={adr}
                countries={countries}
                defaultShipping={customer.defaultShippingAddressId === adr.id}
                defaultBilling={customer.defaultBillingAddressId === adr.id}
                isShipping={
                  customer.shippingAddressIds
                  && customer.shippingAddressIds.includes(adr.id || '')
                }
                isBilling={
                  customer.billingAddressIds
                  && customer.billingAddressIds.includes(adr.id || '')
                }
                editMode={editMode}
                setEditMode={setEditMode}
              />
            ))}
          </Box>
        </Paper>
        <Center>
          <Button
            type="submit"
            m="auto"
            mt={30}
            w={matches ? '100%' : '40%'}
            color="orange"
            size="md"
          >
            Add address
          </Button>
        </Center>
      </Box>
    </Flex>
  );
}
