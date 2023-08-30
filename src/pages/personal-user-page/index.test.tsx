import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithProviders } from '../../test';
import UserPage from '.';

describe('UserPage', () => {
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

  it('should render all fields', async () => {
    renderWithProviders(<UserPage />);

    expect(await screen.findByLabelText('First name')).toBeInTheDocument();
    expect(await screen.findByLabelText('First name')).toHaveAttribute(
      'placeholder',
      'Vasya',
    );

    expect(await screen.findByLabelText('Last name')).toBeInTheDocument();
    expect(await screen.findByLabelText('Last name')).toHaveAttribute(
      'placeholder',
      'Pupkin',
    );

    expect(await screen.findByLabelText('Email')).toBeInTheDocument();
    expect(await screen.findByLabelText('Email')).toHaveAttribute(
      'placeholder',
      'example@email.com',
    );

    expect(await screen.findByLabelText('Birthday')).toBeInTheDocument();
    expect(await screen.findByLabelText('Birthday')).toHaveAttribute(
      'placeholder',
      '1974-01-01',
    );

    expect(await screen.findByLabelText('Change password')).toBeInTheDocument();
    expect(await screen.findByRole('Change password')).toHaveTextContent(
      'Change password',
    );

    expect(await screen.findByText('Edit')).toHaveTextContent('Edit');
  });
});
