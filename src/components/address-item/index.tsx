import { useState } from 'react';
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

type AddressProps = {
  address: Address;
  countries: Country[];
  defaultBilling: boolean;
  defaultShipping: boolean;
  isShipping: boolean | undefined;
  isBilling: boolean | undefined;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
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
}: AddressProps) {
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
    },
    validate: {
      state: (val) => validateString(val),
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

  const transformChanges = (): CustomerUpdateAction[] => {
    const addressActions: CustomerUpdateAction[] = [];

    return addressActions;
  };

  const handleSubmit = () => {
    dispatch(approveUserChanges(transformChanges()))
      .unwrap()
      .then(() => {
        const message = 'Address successfully changed';
        alert(message);
      })
      .catch(console.log);
  };

  const { classes } = useDisabledStyles();

  return (
    <form onSubmit={onSubmit(handleSubmit)} style={{ position: 'relative' }}>
      {(!editMode || (editMode && !isReadOnly)) && (
        <Flex
          direction="row"
          gap={10}
          style={{ position: 'absolute', top: '10px', left: '0px' }}
        >
          <ActionIcon
            title={isReadOnly ? 'Edit address' : 'Save changes'}
            onClick={() => {
              setIsReadOnly(!isReadOnly);
              setEditMode(!editMode);
            }}
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
              onClick={() => {
                setIsReadOnly(!isReadOnly);
              }}
              color="red"
              variant="filled"
            >
              <IconTrash size="1rem" />
            </ActionIcon>
          )}
        </Flex>
      )}

      <Flex
        direction="row"
        justify="space-between"
        gap={10}
        key={address.id}
        pb={10}
        style={{ borderBottom: '2px solid #ced4da' }}
      >
        <Flex
          direction="row"
          gap={100}
          align="center"
          justify="center"
          m="auto"
        >
          <Checkbox
            name="defaultShippingAddress"
            defaultChecked={defaultShipping === address.id}
            onChange={() => {}}
            label="Default shipping address"
            disabled={isReadOnly}
            classNames={{
              input: classes.input,
              label: classes.label,
            }}
            value="defaultShipping"
          />
          <Checkbox
            name="defaultBillingAddress"
            defaultChecked={defaultBilling === address.id}
            onChange={() => {}}
            label="Default billing address"
            disabled={isReadOnly}
            classNames={{
              input: classes.input,
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
                placeholder="Myadel"
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
            <Flex direction="row" gap={10} justify="space-between">
              <Select
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
            <Flex direction="row" gap={10} justify="space-between">
              <Checkbox
                label="Shipping address"
                defaultChecked={isShipping}
                disabled={isReadOnly}
                classNames={{
                  input: classes.input,
                  label: classes.label,
                }}
                w="100%"
              />
              <Checkbox
                label="Billing address"
                defaultChecked={isBilling}
                disabled={isReadOnly}
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
    </form>
  );
}
