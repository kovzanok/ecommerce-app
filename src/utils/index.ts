import {
  Address,
  Attribute,
  AttributeDefinition,
  Category,
  CustomerDraft,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import {
  AddressesInfoFormValues,
  Country,
  FilterName,
  FilterParam,
  Filters,
  FormValues,
  PriceObj,
  ProductAttributes,
} from '../types';

import bookCategoryId, { countryNames } from './const';

export default function getCountriesArray(): Country[] {
  return countryNames.map((el) => ({
    label: el.name,
    value: el.id,
  }));
}

export const dateConverter = (date: Date) => {
  const withZero = (dateInput: number) => `0${dateInput}`.slice(-2);
  const getMonth = withZero(date.getMonth() + 1);
  const getDay = withZero(date.getDate());

  return `${date.getFullYear()}-${getMonth}-${getDay}`;
};

export const isInstanceOfDate = (currentValue: string | Date | undefined) => currentValue instanceof Date;

export const areNotValuesEquals = (
  currentValue: string | Date | undefined,
  defaultValue: string | undefined,
) => {
  const changedCurrentValue = currentValue === undefined ? '' : currentValue;
  const changedDefaultValue = defaultValue === undefined ? '' : defaultValue;
  return isInstanceOfDate(changedCurrentValue)
    ? dateConverter(new Date(changedDefaultValue))
        !== dateConverter(new Date(changedCurrentValue))
    : changedDefaultValue !== changedCurrentValue;
};

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

  const defaultBillingCondition = () => {
    if (isBillingAddressDefault) {
      if (isSame) {
        return shippingIndex;
      }

      return billingIndex;
    }
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
    defaultBillingAddress: defaultBillingCondition(),
  };

  return customerDraftData;
}

export const getProductAttribute = <T>(
  attributes: Attribute[] | undefined,
  attributeName: string,
): T => {
  const attribute = (attributes as ProductAttributes).find(
    ({ name }) => name === attributeName,
  ) as T;

  return attribute;
};

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export const getFilterParams = (
  attributes: AttributeDefinition[],
): FilterParam[] => {
  const filters: FilterParam[] = [];
  attributes?.forEach(({ type, label, name }) => {
    const enLabel = label['en-US'] as string;
    if (type.name === 'enum' || type.name === 'lenum') {
      const values = type.values.map(({ key, label: label2 }) => {
        if (typeof label2 === 'string') return { label: label2, value: key };
        return {
          label: label['en-US'] as string,
          value: key,
        };
      });
      filters.push({ label: enLabel, values, name: name as FilterName });
    }
  });
  return filters;
};

export const createQueryString = (filters: Filters): string[] => Object.entries(filters).map(([key, value]) => {
  let queryParam: string;
  switch (true) {
    case value && typeof value === 'object':
      const { min, max } = value as PriceObj['price'];
      queryParam = `variants.price.centAmount:range (${min * 100} to ${
        max * 100
      })`;
      break;
    case Boolean(value):
      queryParam = `variants.attributes.${key}.key:"${value}"`;
      break;
    default:
      queryParam = '';
  }
  return queryParam;
});

export const createCategoryMap = (
  categories: Category[],
): Map<Category, Category[]> => {
  const map = new Map<Category, Category[]>();
  categories.forEach((category, _, array) => {
    const childrenCategories = array.filter(
      ({ parent }) => parent?.id === category.id,
    );
    if (childrenCategories.length && category.id !== bookCategoryId) {
      map.set(category, childrenCategories);
    }
  });
  return map;
};

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
  isShipping: boolean,
  isBilling: boolean,
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
