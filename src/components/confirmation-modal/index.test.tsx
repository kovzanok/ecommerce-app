import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import ConfirmationModal, { ConfirmationModalProps } from '.';

describe('Confirmation modal', () => {
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

  it('should render page with modal elements', async () => {
    const confirmationModalProps: ConfirmationModalProps = {
      opened: true,
      close: () => {},
    };
    renderWithProviders(<ConfirmationModal {...confirmationModalProps} />);
    const textName: HTMLElement = await screen.findByText(
      'Do you really want to delete your basket ?',
    );
    expect(textName).toBeInTheDocument();

    const modalContainer: HTMLElement = await screen.findByText('Confirmation');
    expect(modalContainer).toBeInTheDocument();

    const actionButtonYes: HTMLElement = await screen.findByText('Yes');
    expect(actionButtonYes).toBeInTheDocument();

    const actionButtonNo: HTMLElement = await screen.findByText('No');
    expect(actionButtonNo).toBeInTheDocument();
  });
  it('should click on the button', async () => {
    const confirmationModalProps: ConfirmationModalProps = {
      opened: true,
      close: () => {},
    };

    renderWithProviders(<ConfirmationModal {...confirmationModalProps} />, {
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
          total: 0,
          products: [],
          loading: false,
          error: '',
        },
      },
    });

    const actionButtonYes: HTMLElement = await screen.findByText('Yes');
    fireEvent.click(actionButtonYes);

    const actionButtonNo: HTMLElement = await screen.findByText('No');
    fireEvent.click(actionButtonNo);
  });
});
