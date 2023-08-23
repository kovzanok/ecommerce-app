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
    street: string;
    isAddressDefault: boolean;
  };

  billingAddress: {
    country: string;
    postalCode: string;
    city: string;
    street: string;
    isAddressDefault: boolean;
  };
}

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

type CoverType = {
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

type AgeType = {
  name: 'Age_restrictions';
  value: {
    key: string;
    label: string;
  };
};

type PublisherType = {
  name: 'publisher';
  value: {
    key: string;
    label: string;
  };
};
