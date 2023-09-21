import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import CartPagination, { CartPaginationProps } from '.';

describe('Cart pagination', () => {
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

  it('should render pagination and change page', async () => {
    const cartPaginationProps: CartPaginationProps = {
      pagination: {
        current: 2,
        limit: 4,
      },
      setPagination: () => {},
      totalPages: 5,
    };
    renderWithProviders(<CartPagination {...cartPaginationProps} />);

    const actionEvent: HTMLElement = await screen.findByTitle('paginate');
    expect(actionEvent).toBeInTheDocument();

    fireEvent.change(actionEvent);
  });
});
