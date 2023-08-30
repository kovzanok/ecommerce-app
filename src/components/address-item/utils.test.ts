import { Address, CustomerUpdateAction } from '@commercetools/platform-sdk';
import { AddressesInfoFormValues } from '../../types';
import {
  addAddressHandleSubmit,
  addAddressIdsHandleSubmit,
  changeAddressHandle,
} from './utils';

describe('addAddressIdsHandleSubmit', () => {
  it('should storage three actions, without billing address', () => {
    const testValues: AddressesInfoFormValues = {
      country: 'Belarus',
      postalCode: '123456',
      state: 'Minsk',
      city: 'Minsk',
      streetName: 'Karbisheva',

      isDefaultBilling: true,
      isDefaultShipping: true,
      isBilling: false,
      isShipping: true,
    };
    const testId = 'ASE1TE1';

    const expectedArray: CustomerUpdateAction[] = [
      {
        action: 'setDefaultBillingAddress',
        addressId: testId,
      },
      {
        action: 'setDefaultShippingAddress',
        addressId: testId,
      },
      {
        action: 'addShippingAddressId',
        addressId: testId,
      },
    ];

    expect(addAddressIdsHandleSubmit(testValues, testId)).toStrictEqual(
      expectedArray,
    );
  });
  it('should storage all actions', () => {
    const testValues: AddressesInfoFormValues = {
      country: 'Belarus',
      postalCode: '123456',
      state: 'Minsk',
      city: 'Minsk',
      streetName: 'Karbisheva',

      isDefaultBilling: true,
      isDefaultShipping: true,
      isBilling: true,
      isShipping: true,
    };
    const testId = 'ASE1TE1';

    const expectedArray: CustomerUpdateAction[] = [
      {
        action: 'setDefaultBillingAddress',
        addressId: testId,
      },
      {
        action: 'setDefaultShippingAddress',
        addressId: testId,
      },
      {
        action: 'addBillingAddressId',
        addressId: testId,
      },
      {
        action: 'addShippingAddressId',
        addressId: testId,
      },
    ];

    expect(addAddressIdsHandleSubmit(testValues, testId)).toStrictEqual(
      expectedArray,
    );
  });
  it('should length be zero', () => {
    const testValues: AddressesInfoFormValues = {
      country: 'Belarus',
      postalCode: '123456',
      state: 'Minsk',
      city: 'Minsk',
      streetName: 'Karbisheva',

      isDefaultBilling: false,
      isDefaultShipping: false,
      isBilling: false,
      isShipping: false,
    };
    const testId = 'ASE1TE1';

    expect(addAddressIdsHandleSubmit(testValues, testId)).toHaveLength(0);
    expect(addAddressIdsHandleSubmit(testValues, testId)).not.toBeUndefined();
  });
});

describe('changeAddressHandle', () => {
  it('should storage all actions', () => {
    const testValues: AddressesInfoFormValues = {
      country: 'Belarus',
      postalCode: '123456',
      state: 'Minsk',
      city: 'Minsk',
      streetName: 'Karbisheva',

      isDefaultBilling: true,
      isDefaultShipping: true,
      isBilling: true,
      isShipping: true,
    };

    const testAddress: Address = {
      id: 'SF2G3G4',
      country: 'United States',
      postalCode: '12345',
      state: 'Florida',
      city: 'Beach',
      streetName: 'st. Borrow',
    };

    const testDefaultBilling = false;
    const testDefaultShipping = false;
    const testIsShipping = false;
    const testIsBilling = false;

    const expectedArray: CustomerUpdateAction[] = [
      {
        action: 'changeAddress',
        addressId: testAddress.id,
        address: {
          streetName: testValues.streetName,
          state: testValues.state,
          country: testValues.country,
          postalCode: testValues.postalCode,
          city: testValues.city,
        },
      },
      {
        action: 'setDefaultBillingAddress',
        addressId: testAddress.id,
      },
      {
        action: 'setDefaultShippingAddress',
        addressId: testAddress.id,
      },
      {
        action: 'addBillingAddressId',
        addressId: testAddress.id,
      },
      {
        action: 'addShippingAddressId',
        addressId: testAddress.id,
      },
    ];

    expect(
      changeAddressHandle(
        testValues,
        testAddress,
        testDefaultBilling,
        testDefaultShipping,
        testIsShipping,
        testIsBilling,
      ),
    ).toStrictEqual(expectedArray);
    expect(
      changeAddressHandle(
        testValues,
        testAddress,
        testDefaultBilling,
        testDefaultShipping,
        testIsShipping,
        testIsBilling,
      ),
    ).toHaveLength(5);
  });
  it('should storage only address data, without shipping and billing', () => {
    const testValues: AddressesInfoFormValues = {
      country: 'Belarus',
      postalCode: '123456',
      state: 'Minsk',
      city: 'Minsk',
      streetName: 'Karbisheva',

      isDefaultBilling: true,
      isDefaultShipping: true,
      isBilling: true,
      isShipping: true,
    };

    const testAddress: Address = {
      id: 'SF2G3G4',
      country: 'United States',
      postalCode: '12345',
      state: 'Florida',
      city: 'Beach',
      streetName: 'st. Borrow',
    };

    const testDefaultBilling = true;
    const testDefaultShipping = true;
    const testIsShipping = true;
    const testIsBilling = true;

    const expectedArray: CustomerUpdateAction[] = [
      {
        action: 'changeAddress',
        addressId: testAddress.id,
        address: {
          streetName: testValues.streetName,
          state: testValues.state,
          country: testValues.country,
          postalCode: testValues.postalCode,
          city: testValues.city,
        },
      },
    ];

    expect(
      changeAddressHandle(
        testValues,
        testAddress,
        testDefaultBilling,
        testDefaultShipping,
        testIsShipping,
        testIsBilling,
      ),
    ).toStrictEqual(expectedArray);
    expect(
      changeAddressHandle(
        testValues,
        testAddress,
        testDefaultBilling,
        testDefaultShipping,
        testIsShipping,
        testIsBilling,
      ),
    ).toHaveLength(1);
  });
  it('should storage only shipping and billing actions, without address data', () => {
    const testValues: AddressesInfoFormValues = {
      country: 'United States',
      postalCode: '12345',
      state: 'Florida',
      city: 'Beach',
      streetName: 'st. Borrow',

      isDefaultBilling: true,
      isDefaultShipping: true,
      isBilling: true,
      isShipping: true,
    };

    const testAddress: Address = {
      id: 'SF2G3G4',
      country: 'United States',
      postalCode: '12345',
      state: 'Florida',
      city: 'Beach',
      streetName: 'st. Borrow',
    };

    const testDefaultBilling = false;
    const testDefaultShipping = false;
    const testIsShipping = false;
    const testIsBilling = false;

    const expectedArray: CustomerUpdateAction[] = [
      {
        action: 'setDefaultBillingAddress',
        addressId: testAddress.id,
      },
      {
        action: 'setDefaultShippingAddress',
        addressId: testAddress.id,
      },
      {
        action: 'addBillingAddressId',
        addressId: testAddress.id,
      },
      {
        action: 'addShippingAddressId',
        addressId: testAddress.id,
      },
    ];

    expect(
      changeAddressHandle(
        testValues,
        testAddress,
        testDefaultBilling,
        testDefaultShipping,
        testIsShipping,
        testIsBilling,
      ),
    ).toStrictEqual(expectedArray);
    expect(
      changeAddressHandle(
        testValues,
        testAddress,
        testDefaultBilling,
        testDefaultShipping,
        testIsShipping,
        testIsBilling,
      ),
    ).toHaveLength(4);
  });
  it('should storage only shipping and billing actions, by its default values', () => {
    const testValues: AddressesInfoFormValues = {
      country: 'United States',
      postalCode: '12345',
      state: 'Florida',
      city: 'Beach',
      streetName: 'st. Borrow',

      isDefaultBilling: true,
      isDefaultShipping: true,
      isBilling: true,
      isShipping: true,
    };

    const testAddress: Address = {
      id: 'SF2G3G4',
      country: 'United States',
      postalCode: '12345',
      state: 'Florida',
      city: 'Beach',
      streetName: 'st. Borrow',
    };

    const testDefaultBilling = false;
    const testDefaultShipping = false;

    const expectedArray: CustomerUpdateAction[] = [
      {
        action: 'setDefaultBillingAddress',
        addressId: testAddress.id,
      },
      {
        action: 'setDefaultShippingAddress',
        addressId: testAddress.id,
      },
      {
        action: 'addBillingAddressId',
        addressId: testAddress.id,
      },
      {
        action: 'addShippingAddressId',
        addressId: testAddress.id,
      },
    ];

    expect(
      changeAddressHandle(
        testValues,
        testAddress,
        testDefaultBilling,
        testDefaultShipping,
      ),
    ).toStrictEqual(expectedArray);
    expect(
      changeAddressHandle(
        testValues,
        testAddress,
        testDefaultBilling,
        testDefaultShipping,
      ),
    ).toHaveLength(4);
  });
  it('should storage only remove shipping and billing actions', () => {
    const testValues: AddressesInfoFormValues = {
      country: 'United States',
      postalCode: '12345',
      state: 'Florida',
      city: 'Beach',
      streetName: 'st. Borrow',

      isDefaultBilling: false,
      isDefaultShipping: false,
      isBilling: false,
      isShipping: false,
    };

    const testAddress: Address = {
      id: 'SF2G3G4',
      country: 'United States',
      postalCode: '12345',
      state: 'Florida',
      city: 'Beach',
      streetName: 'st. Borrow',
    };

    const testDefaultBilling = true;
    const testDefaultShipping = true;
    const testIsShipping = true;
    const testIsBilling = true;

    const expectedArray: CustomerUpdateAction[] = [
      {
        action: 'setDefaultBillingAddress',
        addressId: undefined,
      },
      {
        action: 'setDefaultShippingAddress',
        addressId: undefined,
      },
      {
        action: 'removeBillingAddressId',
        addressId: testAddress.id,
      },
      {
        action: 'removeShippingAddressId',
        addressId: testAddress.id,
      },
    ];

    expect(
      changeAddressHandle(
        testValues,
        testAddress,
        testDefaultBilling,
        testDefaultShipping,
        testIsShipping,
        testIsBilling,
      ),
    ).toStrictEqual(expectedArray);
    expect(
      changeAddressHandle(
        testValues,
        testAddress,
        testDefaultBilling,
        testDefaultShipping,
        testIsShipping,
        testIsBilling,
      ),
    ).toHaveLength(4);
  });
  it('should length be zero', () => {
    const testValues: AddressesInfoFormValues = {
      country: 'United States',
      postalCode: '12345',
      state: 'Florida',
      city: 'Beach',
      streetName: 'st. Borrow',

      isDefaultBilling: false,
      isDefaultShipping: false,
      isBilling: false,
      isShipping: false,
    };

    const testAddress: Address = {
      id: 'SF2G3G4',
      country: 'United States',
      postalCode: '12345',
      state: 'Florida',
      city: 'Beach',
      streetName: 'st. Borrow',
    };

    const testDefaultBilling = false;
    const testDefaultShipping = false;
    const testIsShipping = false;
    const testIsBilling = false;

    const expectedArray: CustomerUpdateAction[] = [
      {
        action: 'changeAddress',
        addressId: testAddress.id,
        address: {
          streetName: testValues.streetName,
          state: testValues.state,
          country: testValues.country,
          postalCode: testValues.postalCode,
          city: testValues.city,
        },
      },
      {
        action: 'setDefaultBillingAddress',
        addressId: testAddress.id,
      },
      {
        action: 'setDefaultShippingAddress',
        addressId: testAddress.id,
      },
      {
        action: 'addBillingAddressId',
        addressId: testAddress.id,
      },
      {
        action: 'addShippingAddressId',
        addressId: testAddress.id,
      },
    ];

    expect(
      changeAddressHandle(
        testValues,
        testAddress,
        testDefaultBilling,
        testDefaultShipping,
        testIsShipping,
        testIsBilling,
      ),
    ).not.toStrictEqual(expectedArray);
    expect(
      changeAddressHandle(
        testValues,
        testAddress,
        testDefaultBilling,
        testDefaultShipping,
        testIsShipping,
        testIsBilling,
      ),
    ).toHaveLength(0);

    expect(
      changeAddressHandle(
        testValues,
        testAddress,
        testDefaultBilling,
        testDefaultShipping,
        testIsShipping,
        testIsBilling,
      ),
    ).not.toBeUndefined();
  });
});

describe('addAddressHandleSubmit', () => {
  it('should storage adding address action', () => {
    const testValues: Address = {
      country: 'Belarus',
      postalCode: '123456',
      state: 'Minsk',
      city: 'Minsk',
      streetName: 'Karbisheva',
    };

    const expectedArray: CustomerUpdateAction[] = [
      {
        action: 'addAddress',
        address: {
          streetName: testValues.streetName,
          state: testValues.state,
          country: testValues.country,
          postalCode: testValues.postalCode,
          city: testValues.city,
        },
      },
    ];

    expect(addAddressHandleSubmit(testValues)).toStrictEqual(expectedArray);
    expect(addAddressHandleSubmit(testValues)).toHaveLength(1);
    expect(addAddressHandleSubmit(testValues)).not.toBeUndefined();
  });
});
