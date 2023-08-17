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
