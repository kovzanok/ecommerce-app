import { CustomerDraft } from '@commercetools/platform-sdk';
import { getAllCountries } from 'countries-and-timezones';
import { Country, FormValues } from '../types';

export default function getCountriesArray(): Country[] {
  const getAllCountriesObjectValues = Object.values(getAllCountries());
  return getAllCountriesObjectValues.map((el) => ({
    label: el.name,
    value: el.id,
  }));
}

export function transformRegistrationData(
  data: FormValues,
  isSame: boolean,
): CustomerDraft {
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirthday,
    shippingAddress,
    billingAddress,
  } = data;

  const [shippingIndex, billingIndex] = [0, 1];

  const customerDraftData: CustomerDraft = {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth: new Date(dateOfBirthday).toISOString().substring(0, 10),
    addresses: isSame ? [shippingAddress] : [shippingAddress, billingAddress],
    shippingAddresses: [shippingIndex],
    billingAddresses: isSame ? [shippingIndex] : [billingIndex],
  };

  if (shippingAddress.isAddressDefault) {
    Object.defineProperty(customerDraftData, 'defaultShippingAddress', {
      value: shippingIndex,
    });
  }

  if (billingAddress.isAddressDefault) {
    Object.defineProperty(customerDraftData, 'defaultBillingAddress', {
      value: billingIndex,
    });
  }

  return customerDraftData;
}
