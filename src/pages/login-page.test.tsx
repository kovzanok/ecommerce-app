import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test';
import LoginPage from './login-page';

describe('LoginPage', () => {
  it('should render page with inputs', async () => {
    renderWithProviders(<LoginPage />);

    const inputEmail: HTMLElement = screen.getByLabelText(/email/i);
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveAttribute('placeholder', 'your@email.com');

    const inputPassword: HTMLElement = screen.getByLabelText(/password/i);
    expect(inputPassword).toBeInTheDocument();
  });
});

describe('LoginPage', () => {
  it('should render page with submit button', async () => {
    renderWithProviders(<LoginPage />);
    const button: HTMLElement = await screen.findByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Sign in');
  });
});

describe('LoginPage', () => {
  it('should render page with link to register', async () => {
    renderWithProviders(<LoginPage />);
    const link: HTMLElement = await screen.findByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/register');
    expect(link).toHaveTextContent('Sign up');
  });
});
