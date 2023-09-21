import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import {
  Box, Button, Center, Flex, Loader, Paper, Title,
} from '@mantine/core';
import { Address } from '@commercetools/platform-sdk';
import { Navigate } from 'react-router-dom';
import AddressItem from '../../components/address-item';
import { Country } from '../../types';
import getCountriesArray from '../../utils';
import { useAppDispatch, useAppSelector, useTitle } from '../../hooks';
import { resetError } from '../../store/slices/userSlice';
import userSelector from '../../store/selectors';

export default function AddressesUserPage() {
  const matches = useMediaQuery('(max-width: 48em)');
  const { user, loading } = useAppSelector(userSelector);
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
  const [isAddressAdding, setIsAddressAdding] = useState(false);

  const addAddressHandle = () => {
    setIsAddressAdding(true);
  };

  let content: JSX.Element;

  switch (true) {
    case loading:
      content = (
        <Center h="100%">
          <Loader mt={100} size={100} color="orange" />
        </Center>
      );
      break;
    case !(customer.addresses.length || isAddressAdding):
      content = (
        <Title ta="center" order={4}>
          You don&#39;t have any addresses here
        </Title>
      );
      break;
    default:
      content = (
        <>
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
        </>
      );
  }

  return (
    <Flex gap={20} direction={matches ? 'column' : 'row'}>
      <Box w="100%">
        <Title mb={20} mt="xl" order={3} size={matches ? 'h4' : 'h3'}>
          Addresses
        </Title>
        <Paper mt="xs" shadow="xs" p="xs">
          <Box>
            {content}
            {isAddressAdding && (
              <AddressItem
                address={{} as Address}
                countries={countries}
                defaultShipping={false}
                defaultBilling={false}
                isShipping={false}
                isBilling={false}
                editMode={editMode}
                setEditMode={setEditMode}
                isAddressAdding={isAddressAdding}
                setIsAddressAdding={setIsAddressAdding}
              />
            )}
          </Box>
        </Paper>
        <Center>
          <Button
            disabled={editMode}
            onClick={addAddressHandle}
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
