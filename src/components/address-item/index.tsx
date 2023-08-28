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
import { areNotValuesEquals } from '../../utils';

type AddressProps = {
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

  const removeAddressHandle = () => {
    if (isAddressAdding) {
      if (setIsAddressAdding) {
        setIsAddressAdding(false);
        setEditMode(false);
        return;
      }
    }

    dispatch(
      approveUserChanges([
        {
          action: 'removeAddress',
          addressId: address.id,
        },
      ]),
    );
  };

  const addAddressHandleSubmit = (
    values: AddressesInfoFormValues,
  ): CustomerUpdateAction[] => {
    const addAddressActionsArray: CustomerUpdateAction[] = [
      {
        action: 'addAddress',
        address: {
          streetName: values.streetName,
          state: values.state,
          country: values.country,
          postalCode: values.postalCode,
          city: values.city,
        },
      },
    ];

    return addAddressActionsArray;
  };

  const addAddressIdsHandleSubmit = (
    values: AddressesInfoFormValues,
    id: string,
  ): CustomerUpdateAction[] => {
    const addAddressActionsArray: CustomerUpdateAction[] = [];

    if (values.isDefaultBilling) {
      addAddressActionsArray.push({
        action: 'setDefaultBillingAddress',
        addressId: id,
      });
    }
    if (values.isDefaultShipping) {
      addAddressActionsArray.push({
        action: 'setDefaultShippingAddress',
        addressId: id,
      });
    }
    if (values.isBilling) {
      addAddressActionsArray.push({
        action: 'addBillingAddressId',
        addressId: id,
      });
    }
    if (values.isShipping) {
      addAddressActionsArray.push({
        action: 'addShippingAddressId',
        addressId: id,
      });
    }

    return addAddressActionsArray;
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
      return console.log;
    }
  };

  const changeAddressHandle = (
    values: AddressesInfoFormValues,
  ): CustomerUpdateAction[] => {
    const changeAddressActionsArray: CustomerUpdateAction[] = [];

    const isAtLeastOneDifferent = areNotValuesEquals(values.streetName, address.streetName)
      || areNotValuesEquals(values.postalCode, address.postalCode)
      || areNotValuesEquals(values.country, address.country)
      || areNotValuesEquals(values.city, address.city)
      || areNotValuesEquals(values.state, address.state);

    if (isAtLeastOneDifferent) {
      changeAddressActionsArray.push({
        action: 'changeAddress',
        addressId: address.id,
        address: {
          streetName: values.streetName,
          state: values.state,
          country: values.country,
          postalCode: values.postalCode,
          city: values.city,
        },
      });
    }

    if (values.isDefaultBilling !== defaultBilling) {
      changeAddressActionsArray.push({
        action: 'setDefaultBillingAddress',
        addressId: values.isDefaultBilling ? address.id : undefined,
      });
    }

    if (values.isDefaultShipping !== defaultShipping) {
      changeAddressActionsArray.push({
        action: 'setDefaultShippingAddress',
        addressId: values.isDefaultShipping ? address.id : undefined,
      });
    }

    if (values.isBilling !== isBilling) {
      changeAddressActionsArray.push({
        action: values.isBilling
          ? 'addBillingAddressId'
          : 'removeBillingAddressId',
        addressId: address.id,
      });
    }

    if (values.isShipping !== isShipping) {
      changeAddressActionsArray.push({
        action: values.isShipping
          ? 'addShippingAddressId'
          : 'removeShippingAddressId',
        addressId: address.id,
      });
    }

    return changeAddressActionsArray;
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
      : changeAddressHandle(values);

    setIsReadOnly(!isReadOnly);
    setEditMode(!editMode);
    if (transformedValues.length) {
      if (isAddressAdding) {
        const addedCustomer = await addAddressDispatch(transformedValues);
        if (addedCustomer && !(addedCustomer instanceof Function)) {
          const addedId = addedCustomer.addresses[addedCustomer.addresses.length - 1].id;
          if (addedId) {
            changeAddressDispatch(addAddressIdsHandleSubmit(values, addedId));
          }
        }
      } else {
        changeAddressDispatch(transformedValues);
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
          style={{ position: 'absolute', top: '10px', left: '0px' }}
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
                disabled={isReadOnly}
                classNames={{
                  input: classes.input,
                  label: classes.label,
                }}
                {...getInputProps('isShipping', { type: 'checkbox' })}
                w="100%"
              />
              <Checkbox
                label="Billing address"
                disabled={isReadOnly}
                classNames={{
                  input: classes.input,
                  label: classes.label,
                }}
                {...getInputProps('isBilling', { type: 'checkbox' })}
                w="100%"
              />
            </Flex>
          </Flex>
        </Paper>
      </Flex>
    </form>
  );
}
