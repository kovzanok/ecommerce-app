import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import CartList from '.';

describe('Cart list', () => {
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

  it('should render page with empty cart', async () => {
    renderWithProviders(<CartList />, {
      preloadedState: {
        cart: {
          cart: {
            id: '',
            version: 1,
            lineItems: [],
            customLineItems: [],
            totalPrice: {
              type: 'centPrecision',
              centAmount: 2500,
              fractionDigits: 2,
              currencyCode: 'US',
            },
            taxMode: '',

            taxRoundingMode: '',

            taxCalculationMode: '',

            inventoryMode: '',

            cartState: '',

            shippingMode: '',

            shipping: [],

            itemShippingAddresses: [],

            discountCodes: [],
            directDiscounts: [],
            refusedGifts: [],
            origin: '',
            createdAt: '',
            lastModifiedAt: '',
          },
          loading: false,
          error: '',
        },
        user: {
          user: null,

          loading: false,
          error: '',
        },
        product: {
          product: null,
          loading: false,
          error: '',
        },
        products: {
          products: [],
          loading: false,
          error: '',
        },
      },
    });
  });

  it('should render page with loading cart', async () => {
    renderWithProviders(<CartList />, {
      preloadedState: {
        cart: {
          cart: {
            id: '',
            version: 1,
            lineItems: [],
            customLineItems: [],
            totalPrice: {
              type: 'centPrecision',
              centAmount: 2500,
              fractionDigits: 2,
              currencyCode: 'US',
            },
            taxMode: '',

            taxRoundingMode: '',

            taxCalculationMode: '',

            inventoryMode: '',

            cartState: '',

            shippingMode: '',

            shipping: [],

            itemShippingAddresses: [],

            discountCodes: [],
            directDiscounts: [],
            refusedGifts: [],
            origin: '',
            createdAt: '',
            lastModifiedAt: '',
          },
          loading: true,
          error: '',
        },
        user: {
          user: null,

          loading: false,
          error: '',
        },
        product: {
          product: null,
          loading: false,
          error: '',
        },
        products: {
          products: [],
          loading: false,
          error: '',
        },
      },
    });
  });

  it('should render page with not empty cart', async () => {
    renderWithProviders(<CartList />, {
      preloadedState: {
        cart: {
          cart: {
            id: '',
            version: 1,
            lineItems: [
              {
                id: '1',
                state: [],
                price: {
                  id: '1',
                  value: {
                    type: 'centPrecision',
                    fractionDigits: 2,
                    centAmount: 1000,
                    currencyCode: 'US',
                  },
                },
                productId: '',

                name: {
                  'US-us': 's',
                },

                productType: {
                  typeId: 'product-type',
                  id: '1',
                },
                variant: {
                  id: 1,
                },

                quantity: 2,

                totalPrice: {
                  type: 'centPrecision',
                  fractionDigits: 2,
                  centAmount: 1000,
                  currencyCode: 'US',
                },

                discountedPricePerQuantity: [],

                taxedPricePortions: [],
                perMethodTaxRate: [],

                priceMode: '',
                lineItemMode: '',
              },
            ],
            customLineItems: [],
            totalPrice: {
              type: 'centPrecision',
              centAmount: 2500,
              fractionDigits: 2,
              currencyCode: 'US',
            },
            taxMode: '',

            taxRoundingMode: '',

            taxCalculationMode: '',

            inventoryMode: '',

            cartState: '',

            shippingMode: '',

            shipping: [],

            itemShippingAddresses: [],

            discountCodes: [],
            directDiscounts: [],
            refusedGifts: [],
            origin: '',
            createdAt: '',
            lastModifiedAt: '',
          },
          loading: false,
          error: '',
        },
        user: {
          user: null,

          loading: false,
          error: '',
        },
        product: {
          product: null,
          loading: false,
          error: '',
        },
        products: {
          products: [],
          loading: false,
          error: '',
        },
      },
    });

    const actionButton: HTMLElement = await screen.findByTitle(
      'Clear cart items',
    );
    expect(actionButton).toBeInTheDocument();

    fireEvent.click(actionButton);
  });
  it('should render discount and original prices', async () => {
    renderWithProviders(<CartList />, {
      preloadedState: {
        cart: {
          cart: {
            id: '',
            version: 1,
            lineItems: [
              {
                id: '1',
                state: [],
                price: {
                  id: '1',
                  value: {
                    type: 'centPrecision',
                    fractionDigits: 2,
                    centAmount: 1000,
                    currencyCode: 'US',
                  },
                },
                productId: '',

                name: {
                  'US-us': 's',
                },

                productType: {
                  typeId: 'product-type',
                  id: '1',
                },
                variant: {
                  id: 1,
                },

                quantity: 2,

                totalPrice: {
                  type: 'centPrecision',
                  fractionDigits: 2,
                  centAmount: 1000,
                  currencyCode: 'US',
                },

                discountedPricePerQuantity: [],

                taxedPricePortions: [],
                perMethodTaxRate: [],

                priceMode: '',
                lineItemMode: '',
              },
            ],
            customLineItems: [],
            totalPrice: {
              type: 'centPrecision',
              centAmount: 2500,
              fractionDigits: 2,
              currencyCode: 'US',
            },
            taxMode: '',

            taxRoundingMode: '',

            taxCalculationMode: '',

            inventoryMode: '',

            cartState: '',

            shippingMode: '',

            shipping: [],

            itemShippingAddresses: [],

            discountCodes: [
              {
                discountCode: {
                  typeId: 'discount-code',
                  id: '1223',
                },
                state: '',
              },
            ],
            directDiscounts: [],
            refusedGifts: [],
            origin: '',
            createdAt: '',
            lastModifiedAt: '',
          },
          loading: false,
          error: '',
        },
        user: {
          user: null,

          loading: false,
          error: '',
        },
        product: {
          product: null,
          loading: false,
          error: '',
        },
        products: {
          products: [],
          loading: false,
          error: '',
        },
      },
    });
  });
});
