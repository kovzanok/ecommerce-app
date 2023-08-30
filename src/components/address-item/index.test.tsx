import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import AddressItem, { AddressProps } from '.';
import getCountriesArray from '../../utils';

describe('Address item component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('should render page with inputs', async () => {
    const addressItemTestProps: AddressProps = {
      address: {
        country: 'Belarus',
        city: 'Minsk',
        streetName: 'Mog. s',
        postalCode: 'SF331F',
        state: '',
      },
      countries: getCountriesArray(),
      defaultBilling: true,
      defaultShipping: true,
      isBilling: true,
      isShipping: true,
      editMode: false,
      setEditMode: {} as React.Dispatch<React.SetStateAction<boolean>>,
    };
    renderWithProviders(<AddressItem {...addressItemTestProps} />);

    const streetInput: HTMLElement = screen.getByLabelText(/Street/i);
    expect(streetInput).toBeInTheDocument();
    expect(streetInput).toHaveAttribute('placeholder', 'Lenin st. 12-01');

    const cityInput: HTMLElement = screen.getByLabelText(/City/i);
    expect(cityInput).toBeInTheDocument();
    expect(cityInput).toHaveAttribute('placeholder', 'Minsk');

    const stateInput: HTMLElement = screen.getByLabelText(/State/i);
    expect(stateInput).toBeInTheDocument();
    expect(stateInput).toHaveAttribute('placeholder', 'Vit. obl');

    const countrySelect: HTMLElement = screen.getByLabelText(/Country/i);
    expect(countrySelect).toBeInTheDocument();
    expect(countrySelect).toHaveAttribute('placeholder', 'Belarus');

    const postalCodeInput: HTMLElement = screen.getByLabelText(/Postal Code/i);
    expect(postalCodeInput).toBeInTheDocument();
    expect(postalCodeInput).toHaveAttribute('placeholder', 'AF-35A');

    const switchDefaultBilling: HTMLElement = screen.getByLabelText(
      'Default billing address',
    );
    expect(switchDefaultBilling).toHaveAttribute(
      'name',
      'defaultBillingAddress',
    );
    expect(switchDefaultBilling).toBeInTheDocument();

    const switchDefaultShipping: HTMLElement = screen.getByLabelText(
      'Default shipping address',
    );

    expect(switchDefaultShipping).toHaveAttribute(
      'name',
      'defaultShippingAddress',
    );
    expect(switchDefaultShipping).toBeInTheDocument();

    const billingCheckbox: HTMLElement = screen.getByLabelText('Billing address');
    expect(billingCheckbox).toBeInTheDocument();

    const shippingCheckbox: HTMLElement = screen.getByLabelText('Shipping address');
    expect(shippingCheckbox).toBeInTheDocument();
  });

  it('should render page with actions buttons', async () => {
    const addressItemTestProps: AddressProps = {
      address: {
        country: 'Belarus',
        city: 'Minsk',
        streetName: 'Mog. s',
        postalCode: 'SF331F',
        state: '',
      },
      countries: getCountriesArray(),
      defaultBilling: true,
      defaultShipping: true,
      isBilling: true,
      isShipping: true,
      editMode: false,
      setEditMode: {} as React.Dispatch<React.SetStateAction<boolean>>,
    };
    renderWithProviders(<AddressItem {...addressItemTestProps} />);
    const editButton: HTMLElement = await screen.findByRole('button');
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveAttribute('type', 'submit');
    expect(editButton).toHaveAttribute('title', 'Edit address');
  });
});
