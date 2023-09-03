import { Address, CustomerUpdateAction } from '@commercetools/platform-sdk';
import { AddressesInfoFormValues } from '../../types';
import { areNotValuesEquals } from '../../utils';

export const addAddressIdsHandleSubmit = (
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

export const changeAddressHandle = (
  values: AddressesInfoFormValues,
  address: Address,
  defaultBilling: boolean,
  defaultShipping: boolean,
  isShipping = false,
  isBilling = false,
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

export const addAddressHandleSubmit = (
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
