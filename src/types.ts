import { CustomerUpdateAction } from '@commercetools/platform-sdk';

export type CreateApiData = {
  email: string;
  password: string;
};

export type PageLink = {
  to: string;
  name: string;
  description: string;
};

export type Country = {
  value: string;
  label: string;
};

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirthday: string;

  shippingAddress: {
    country: string;
    postalCode: string;
    city: string;
    streetName: string;
    isAddressDefault: boolean;
  };

  billingAddress: {
    country: string;
    postalCode: string;
    city: string;
    streetName: string;
    isAddressDefault: boolean;
  };
}

export interface PersonalInfoFormValues {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
}

export interface AddressesInfoFormValues {
  country: string;
  postalCode: string;
  state: string;
  city: string;
  streetName: string;

  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
  isBilling: boolean;
  isShipping: boolean;
}

export interface PasswordChangeFormValues {
  currentPassword: string;
  newPassword: string;
}

export type LocalAdr = {
  country: string;
  postalCode: string;
  city: string;
  streetName: string;
  id: string;
  isAddressDefault?: boolean;
};

export type FieldUpdateType = {
  action: CustomerUpdateAction;
  key: string;
  value: string;
};

export type ProductAttributes = [
  PublishedType,
  CoverType,
  AuthorType,
  AgeType,
  PublisherType,
];

export type PublishedType = {
  name: 'Published';
  value: number;
};

export type CoverType = {
  name: 'Cover';
  value: {
    key: string;
    label: string;
  };
};

export type AuthorType = {
  name: 'Author';
  value: {
    key: string;
    label: string;
  };
};

export type AgeType = {
  name: 'Age_restrictions';
  value: {
    key: string;
    label: string;
  };
};

export type PublisherType = {
  name: 'publisher';
  value: {
    key: string;
    label: string;
  };
};

export type ProductsQuery = {
  search: string;
  filters: Filters;
  sort: Sorting;
  category: string;
  limit?: number;
};
export type FilterParam = {
  name: FilterName;
  label: string;
  values: { value: string; label: string }[];
};

export type FilterName = 'Cover' | 'Author' | 'Age_restrictions' | 'publisher';

export type Filters = {
  [name in FilterName]: string;
} & PriceObj;

export type PriceObj = {
  price: {
    min: number;
    max: number;
  };
};

export type Sorting =
  | 'name.en-US asc'
  | 'name.en-US desc'
  | 'price asc'
  | 'price desc';

export type ActiveToken = {
  active: true;
  scope: string;
  exp: number;
  client_id: string;
};

export type NonActiveToken = {
  active: false;
};

export type PaginationType = {
  current: number;
  limit: number;
};
