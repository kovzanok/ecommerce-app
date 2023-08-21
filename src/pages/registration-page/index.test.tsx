import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import Registration from '.';

describe('RegistrationPage', () => {
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
    renderWithProviders(<Registration />);

    const firstNameInput: HTMLElement = screen.getByLabelText(/First name/i);
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toHaveAttribute('placeholder', 'Vasya');

    const lastNameInput: HTMLElement = screen.getByLabelText(/Last name/i);
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toHaveAttribute('placeholder', 'Pupkin');

    const emailInput: HTMLElement = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('placeholder', 'example@gmail.com');

    const passwordInput: HTMLElement = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();

    const birthdayInput: HTMLElement = screen.getByLabelText(/Birthday/i);
    expect(birthdayInput).toBeInTheDocument();
    expect(birthdayInput).toHaveAttribute('placeholder', '1974-01-01');

    const streetInputs: HTMLElement[] = screen.getAllByLabelText(/street/i);
    for (let i = 0; i < streetInputs.length; i += 1) {
      const inputElement = streetInputs[i];

      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute('placeholder', 'Lenin st. 12-01');
    }
    const cityInputs: HTMLElement[] = screen.getAllByLabelText(/city/i);
    for (let i = 0; i < cityInputs.length; i += 1) {
      const inputElement = cityInputs[i];

      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute('placeholder', 'Minsk');
    }
    const countryInputs: HTMLElement[] = screen.getAllByLabelText(/country/i);
    for (let i = 0; i < countryInputs.length; i += 1) {
      const inputElement = countryInputs[i];

      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute('placeholder', 'Belarus');
    }
    const postalCodeInputs: HTMLElement[] = screen.getAllByLabelText(/postal code/i);
    for (let i = 0; i < postalCodeInputs.length; i += 1) {
      const inputElement = postalCodeInputs[i];

      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute('placeholder', 'AF-35A');
    }

    const switchDefaultBilling: HTMLElement = screen.getByLabelText(
      'Set as default billing address',
    );
    expect(switchDefaultBilling).toBeInTheDocument();

    const switchDefaultShipping: HTMLElement = screen.getByLabelText(
      'Set as default shipping address',
    );
    expect(switchDefaultShipping).toBeInTheDocument();

    const billingTitle: HTMLElement = screen.getByText('Billing address');
    expect(billingTitle).toBeInTheDocument();

    const shippingTitle: HTMLElement = screen.getByText('Shipping address');
    expect(shippingTitle).toBeInTheDocument();
  });

  it('should render page with submit button', async () => {
    renderWithProviders(<Registration />);
    const registrationButton: HTMLElement = await screen.findByRole('button');
    expect(registrationButton).toBeInTheDocument();
    expect(registrationButton).toHaveTextContent('Sign up');
  });

  it('should render page with link to login', async () => {
    renderWithProviders(<Registration />);
    const loginLink: HTMLElement = await screen.findByRole('link');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
    expect(loginLink).toHaveTextContent('Sign in');
  });
});
