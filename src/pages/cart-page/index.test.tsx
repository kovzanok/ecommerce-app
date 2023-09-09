import { vi } from 'vitest';
import { renderWithProviders } from '../../test';
import CartPage from '.';
import ApiService from '../../service/api-service';

vi.mock('../../../service/api-service');

describe('Cart page', () => {
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

  it('should render cart page', async () => {
    renderWithProviders(<CartPage />, {
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
                  id: 'e0defc59-895c-4c93-9df5-9176d9bf4a65',
                },
                state: 'MatchesCart',
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

    ApiService.getPromocodeById = vi.mocked(ApiService.getPromocodeById);
  });
});
