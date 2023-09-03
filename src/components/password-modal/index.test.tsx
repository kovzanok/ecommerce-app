import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithProviders } from '../../test';
import PasswordModal, { PasswordModalProps } from '.';

describe('PasswordModal', () => {
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
    const testPasswordModalProps: PasswordModalProps = {
      opened: true,
      close: () => {},
    };

    renderWithProviders(<PasswordModal {...testPasswordModalProps} />);
    expect(await screen.findByLabelText('New password')).toHaveAttribute(
      'placeholder',
      'New password',
    );
    expect(await screen.findByLabelText('Password')).toHaveAttribute(
      'placeholder',
      'Password',
    );
    expect(await screen.findByText('Apply')).toHaveTextContent('Apply');
  });
});
