import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { DiscountCode } from '@commercetools/platform-sdk';
import { renderWithProviders } from '../../test';
import Promocode from '.';
import ApiService from '../../service/api-service';

vi.mock('../../../service/api-service');

describe('Promocode', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

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

  it('should render promocode component', async () => {
    renderWithProviders(<Promocode />, {
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

    const titlePromocode: HTMLElement = await screen.findByText('Promocode');
    expect(titlePromocode).toBeInTheDocument();

    const actionButtonApply: HTMLElement = await screen.findByText('Apply');
    expect(actionButtonApply).toBeInTheDocument();

    const inputPromocode: HTMLElement = await screen.findByPlaceholderText(
      'Write promocode here...',
    );
    expect(inputPromocode).toBeInTheDocument();
  });

  it('should change input and click button', async () => {
    renderWithProviders(<Promocode />, {
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

    const inputPromocode: HTMLElement = await screen.findByPlaceholderText(
      'Write promocode here...',
    );

    fireEvent.change(inputPromocode, { target: { value: 'QWERTY' } });

    expect(inputPromocode).toHaveAttribute('value', 'QWERTY');
  });
});
