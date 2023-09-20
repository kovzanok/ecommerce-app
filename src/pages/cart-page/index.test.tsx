import { vi } from 'vitest';
import { DiscountCode } from '@commercetools/platform-sdk';
import { act } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import CartPage from '.';
import ApiService from '../../service/api-service';

vi.mock('../../service/api-service');

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
    const mockedPromo: DiscountCode = {
      id: 'e0defc59-895c-4c93-9df5-9176d9bf4a65',
      version: 3,
      createdAt: '2023-09-07T14:28:22.763Z',
      lastModifiedAt: '2023-09-08T06:22:51.342Z',
      code: 'QWERTY',
      name: {
        'en-US': 'QWERTY',
      },
      description: {
        'en-US': 'QWERTY',
      },
      cartDiscounts: [
        {
          typeId: 'cart-discount',
          id: '77974359-75d9-44e1-ae90-2da8e72c7deb',
        },
      ],
      isActive: true,
      cartPredicate: '1 = 1',
      references: [],
      groups: [],
    };

    ApiService.getPromocodeById = vi
      .mocked(ApiService.getPromocodeById)
      .mockResolvedValueOnce(mockedPromo);

    await act(async () => {
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
            total: 0,
            products: [],
            loading: false,
            error: '',
          },
        },
      });
    });
  });
});
