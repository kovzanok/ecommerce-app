import { useState, useEffect } from 'react';
import { Address, CustomerUpdateAction } from '@commercetools/platform-sdk';
import {
  ActionIcon,
  Checkbox,
  Flex,
  Paper,
  Select,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconEdit, IconEditOff, IconTrash } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { AddressesInfoFormValues, Country } from '../../types';
import { useDisabledStyles } from '../../utils/const';
import {
  validatePostalCode,
  validateStreet,
  validateString,
} from '../../utils/field-validation';
import { useAppDispatch } from '../../hooks';
import { approveUserChanges } from '../../store/slices/userSlice';
import RightSection from '../right-section';
import {
  addAddressHandleSubmit,
  addAddressIdsHandleSubmit,
  changeAddressHandle,
} from './utils';

export type AddressProps = {
  address: Address;
  countries: Country[];
  defaultBilling: boolean;
  defaultShipping: boolean;
  isShipping: boolean | undefined;
  isBilling: boolean | undefined;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;

  isAddressAdding?: boolean;
  setIsAddressAdding?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddressItem({
  address,
  countries,
  defaultBilling,
  defaultShipping,
  isShipping,
  isBilling,
  editMode,
  setEditMode,

  isAddressAdding,
  setIsAddressAdding,
}: AddressProps) {
  const matches = useMediaQuery('(max-width: 48em)');
  const matchesMini = useMediaQuery('(max-width: 36em)');
  const matchesSuperMini = useMediaQuery('(max-width: 24em)');

  const dispatch = useAppDispatch();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const {
    onSubmit,
    getInputProps,
    setFieldValue,
    values: formValues,
  } = useForm<AddressesInfoFormValues>({
    initialValues: {
      country: address.country || '',
      postalCode: address.postalCode || '',
      state: address.state || '',
      city: address.city || '',
      streetName: address.streetName || '',
      isDefaultBilling: defaultBilling,
      isDefaultShipping: defaultShipping,
      isBilling: isBilling || false,
      isShipping: isShipping || false,
    },
    validate: {
      city: (val) => validateString(val),
      streetName: (val) => validateStreet(val),
      country: (val: string) => {
        if (val === '') {
          return 'Choose the country';
        }
        return null;
      },
      postalCode: (val: string, values: AddressesInfoFormValues) => {
        const { country } = values;
        return validatePostalCode(val, country);
      },
    },

    validateInputOnChange: true,
  });

  const removeAddressHandle = () => {
    if (isAddressAdding && setIsAddressAdding) {
      setIsAddressAdding(false);

      return;
    }

    setEditMode(false);

    dispatch(
      approveUserChanges([
        {
          action: 'removeAddress',
          addressId: address.id,
        },
      ]),
    );
  };

  const addAddressDispatch = async (
    transformedValues: CustomerUpdateAction[],
  ) => {
    try {
      const response = await dispatch(
        approveUserChanges(transformedValues),
      ).unwrap();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  const changeAddressDispatch = (transformedValues: CustomerUpdateAction[]) => {
    dispatch(approveUserChanges(transformedValues))
      .unwrap()
      .then(() => {
        const message = 'Address successfully changed';
        alert(message);
      })
      .catch(console.log);
  };

  const handleSubmit = async (values: AddressesInfoFormValues) => {
    const transformedValues = isAddressAdding
      ? addAddressHandleSubmit(values)
      : changeAddressHandle(
        values,
        address,
        defaultBilling,
        defaultShipping,
        isShipping,
        isBilling,
      );

    setIsReadOnly(!isReadOnly);
    setEditMode(!editMode);

    if (!transformedValues.length) return;

    if (!isAddressAdding) {
      changeAddressDispatch(transformedValues);
      return;
    }

    if (setIsAddressAdding) {
      setIsAddressAdding(false);
    }

    const addedCustomer = await addAddressDispatch(transformedValues);
    if (addedCustomer && !(addedCustomer instanceof Function)) {
      const addedId = addedCustomer.addresses[addedCustomer.addresses.length - 1].id;
      if (addedId) {
        changeAddressDispatch(addAddressIdsHandleSubmit(values, addedId));
      }
    }
  };

  const { classes } = useDisabledStyles();

  useEffect(() => {
    if (isAddressAdding) {
      setIsReadOnly(false);
      setEditMode(true);
    }
  }, []);

  return (
    <form onSubmit={onSubmit(handleSubmit)} style={{ position: 'relative' }}>
      {(!editMode || (editMode && !isReadOnly)) && (
        <Flex
          direction="row"
          gap={10}
          justify={matches ? 'center' : 'normal'}
          style={
            matches
              ? { marginBottom: '20px' }
              : { position: 'absolute', top: '10px', left: '0px' }
          }
        >
          <ActionIcon
            title={isReadOnly ? 'Edit address' : 'Save changes'}
            type="submit"
            color={isReadOnly ? 'orange' : 'blue'}
            variant="filled"
          >
            {isReadOnly ? (
              <IconEdit size="1rem" />
            ) : (
              <IconEditOff size="1rem" />
            )}
          </ActionIcon>

          {!isReadOnly && (
            <ActionIcon
              title="Remove address"
              onClick={removeAddressHandle}
              color="red"
              variant="filled"
            >
              <IconTrash size="1rem" />
            </ActionIcon>
          )}
        </Flex>
      )}

      <Flex
        direction={matches ? 'column' : 'row'}
        justify="space-between"
        gap={10}
        key={address.id}
        pb={10}
        style={{ borderBottom: '2px solid #ced4da' }}
      >
        <Flex
          direction={matchesSuperMini ? 'column' : 'row'}
          gap={matches ? 25 : 100}
          align="center"
          justify="center"
          m="auto"
        >
          <Checkbox
            name="defaultShippingAddress"
            label="Default shipping address"
            disabled={isReadOnly}
            classNames={{
              input: classes.input,
              label: classes.label,
            }}
            {...getInputProps('isDefaultShipping', { type: 'checkbox' })}
          />
          <Checkbox
            name="defaultBillingAddress"
            label="Default billing address"
            disabled={isReadOnly}
            classNames={{
              input: classes.input,
              label: classes.label,
            }}
            {...getInputProps('isDefaultBilling', { type: 'checkbox' })}
          />
        </Flex>
        <Paper w={matches ? 'auto' : '50%'} mt="xs" shadow="xs" p="xs">
          <Flex direction="column" gap={matchesSuperMini ? 20 : 10}>
            <Flex
              direction={matchesMini ? 'column' : 'row'}
              gap={10}
              justify="space-between"
            >
              <TextInput
                withAsterisk
                placeholder="Lenin st. 12-01"
                label="Street"
                disabled={isReadOnly}
                classNames={{
                  input: classes.input,
                }}
                {...getInputProps('streetName')}
                w="100%"
                rightSection={(
                  <RightSection
                    typeOfValue="streetName"
                    customerValue={address.streetName}
                    formValue={formValues.streetName}
                    setFieldValue={setFieldValue}
                  />
                )}
              />
              <TextInput
                withAsterisk
                placeholder="Minsk"
                label="City"
                disabled={isReadOnly}
                classNames={{
                  input: classes.input,
                }}
                {...getInputProps('city')}
                rightSection={(
                  <RightSection
                    typeOfValue="city"
                    customerValue={address.city}
                    formValue={formValues.city}
                    setFieldValue={setFieldValue}
                  />
                )}
                w="100%"
              />
              <TextInput
                placeholder="Vit. obl"
                label="State"
                disabled={isReadOnly}
                classNames={{
                  input: classes.input,
                }}
                {...getInputProps('state')}
                rightSection={(
                  <RightSection
                    typeOfValue="state"
                    customerValue={address.state}
                    formValue={formValues.state}
                    setFieldValue={setFieldValue}
                  />
                )}
                w="100%"
              />
            </Flex>
            <Flex
              direction={matchesSuperMini ? 'column' : 'row'}
              gap={10}
              justify="space-between"
            >
              <Select
                withAsterisk
                placeholder="Belarus"
                label="Country"
                searchable
                data={countries}
                disabled={isReadOnly}
                classNames={{
                  input: classes.input,
                }}
                {...getInputProps('country')}
                rightSection={(
                  <RightSection
                    typeOfValue="country"
                    customerValue={address.country}
                    formValue={formValues.country}
                    setFieldValue={setFieldValue}
                  />
                )}
                w="100%"
              />
              <TextInput
                withAsterisk
                placeholder="AF-35A"
                label="Postal code"
                disabled={isReadOnly}
                classNames={{
                  input: classes.input,
                }}
                {...getInputProps('postalCode')}
                rightSection={(
                  <RightSection
                    typeOfValue="postalCode"
                    customerValue={address.postalCode}
                    formValue={formValues.postalCode}
                    setFieldValue={setFieldValue}
                  />
                )}
                w="100%"
              />
            </Flex>
            <Flex
              direction={matchesSuperMini ? 'column' : 'row'}
              gap={matchesSuperMini ? 20 : 10}
              justify="space-between"
              align="center"
            >
              <Checkbox
                label="Shipping address"
                disabled={isReadOnly}
                classNames={{
                  input: classes.input,
                  label: classes.label,
                }}
                {...getInputProps('isShipping', { type: 'checkbox' })}
              />
              <Checkbox
                label="Billing address"
                disabled={isReadOnly}
                classNames={{
                  input: classes.input,
                  label: classes.label,
                }}
                {...getInputProps('isBilling', { type: 'checkbox' })}
              />
            </Flex>
          </Flex>
        </Paper>
      </Flex>
    </form>
  );
}
