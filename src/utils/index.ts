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

  const {
    isAddressDefault: isShippingAddressDefault,
    ...shippingAddressCustomerDraft
  } = shippingAddress;

  const {
    isAddressDefault: isBillingAddressDefault,
    ...billingAddressCustomerDraft
  } = billingAddress;

  const birthdayDay = new Date(dateOfBirthday);

  const dateConverter = (date: Date) => {
    const withZero = (dateInput: number) => `0${dateInput}`.slice(-2);
    const getMonth = withZero(date.getMonth() + 1);
    const getDay = withZero(date.getDate());

    return `${date.getFullYear()}-${getMonth}-${getDay}`;
  };

  const customerDraftData: CustomerDraft = {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth: dateConverter(birthdayDay),
    addresses: isSame
      ? [shippingAddressCustomerDraft]
      : [shippingAddressCustomerDraft, billingAddressCustomerDraft],
    shippingAddresses: [shippingIndex],
    billingAddresses: isSame ? [shippingIndex] : [billingIndex],
    defaultShippingAddress: isShippingAddressDefault
      ? shippingIndex
      : undefined,
    defaultBillingAddress: isBillingAddressDefault ? billingIndex : undefined,
  };

  return customerDraftData;
}