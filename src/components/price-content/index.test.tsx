import { screen } from '@testing-library/react';
import { Price } from '@commercetools/platform-sdk';
import { vi } from 'vitest';
import { renderWithProviders } from '../../test';
import PriceContent from './index';

describe('PriceContent', () => {
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
  it('should render price', async () => {
    const price: Price = {
      id: 'price_id',
      value: {
        centAmount: 1000,
        currencyCode: 'USD',
        fractionDigits: 2,
        type: 'centPrecision',
      },
    };
    renderWithProviders(<PriceContent price={price} />);
    expect(await screen.findByText('10.00 USD')).toHaveTextContent('10.00 USD');
  });
  it('should render initial price crossed if the product is on sale', async () => {
    const price: Price = {
      id: 'price_id',
      value: {
        centAmount: 1000,
        currencyCode: 'USD',
        fractionDigits: 2,
        type: 'centPrecision',
      },
      discounted: {
        discount: { id: 'discount_id', typeId: 'product-discount' },
        value: {
          centAmount: 800,
          currencyCode: 'USD',
          fractionDigits: 2,
          type: 'centPrecision',
        },
      },
    };
    renderWithProviders(<PriceContent price={price} />);
    expect(await screen.findByText('10.00 USD')).toHaveStyle({
      'text-decoration': 'line-through',
    });
  });
  it('should render discounted price if the product is on sale', async () => {
    const price: Price = {
      id: 'price_id',
      value: {
        centAmount: 1000,
        currencyCode: 'USD',
        fractionDigits: 2,
        type: 'centPrecision',
      },
      discounted: {
        discount: { id: 'discount_id', typeId: 'product-discount' },
        value: {
          centAmount: 800,
          currencyCode: 'USD',
          fractionDigits: 2,
          type: 'centPrecision',
        },
      },
    };
    renderWithProviders(<PriceContent price={price} />);
    expect(await screen.findByText('10.00 USD')).toHaveTextContent('10.00 USD');
    expect(await screen.findByText('8.00 USD')).toHaveTextContent('8.00 USD');
  });
});
