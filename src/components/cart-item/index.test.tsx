import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import CartItem, { CartItemProps } from '.';

describe('Cart item', () => {
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

  it('should render page with actions buttons', async () => {
    const cartItemProps: CartItemProps = {
      item: {
        id: '123dsd',
        name: {
          'en-US': 'cart-prop',
        },
        price: {
          id: '123',
          value: {
            type: 'centPrecision',
            centAmount: 2500,
            currencyCode: '',
            fractionDigits: 2,
          },
        },
        quantity: 2,
        totalPrice: {
          type: 'centPrecision',
          centAmount: 5000,
          currencyCode: '',
          fractionDigits: 2,
        },
        variant: {
          id: 1,
          images: [
            {
              url: '',
              dimensions: {
                w: 20,
                h: 20,
              },
            },
          ],
        },
        productId: '',
        productType: {
          typeId: 'product-type',
          id: '123',
        },
        discountedPricePerQuantity: [],
        taxedPricePortions: [],
        state: [],
        perMethodTaxRate: [],
        priceMode: '',
        lineItemMode: '',
      },
    };
    renderWithProviders(<CartItem {...cartItemProps} />);

    const imageElement = await screen.findByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('alt');
    expect(imageElement).toHaveAttribute('src');

    const actionButton: HTMLElement = await screen.findByTitle('Remove');
    expect(actionButton).toBeInTheDocument();

    fireEvent.click(actionButton);
  });
});
