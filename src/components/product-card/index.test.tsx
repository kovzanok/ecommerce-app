import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductProjection } from '@commercetools/platform-sdk';
import { vi } from 'vitest';
import { renderWithProviders } from '../../test';
import ProductCard from '.';

describe('ProductCard', () => {
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
  const attributes = [
    {
      name: 'Published',
      value: 2000,
    },
    { name: 'Cover', value: { key: 'cover_key', label: 'cover_label' } },
    {
      name: 'Author',
      value: { key: 'author_key', label: 'author_label' },
    },
    {
      name: 'Age_restrictions',
      value: { key: 'age_key', label: 'age_label' },
    },
    {
      name: 'publisher',
      value: { key: 'publisher_key', label: 'publisher_label' },
    },
  ];
  it('should change border on hover', async () => {
    const productData: Pick<
    ProductProjection,
    'id' | 'name' | 'description' | 'masterVariant'
    > = {
      id: 'id',
      name: { 'en-US': 'Test data' },
      description: { 'en-US': 'Test description' },
      masterVariant: {
        id: 1,
        prices: [
          {
            id: 'price_id',
            value: {
              centAmount: 1000,
              currencyCode: 'USD',
              fractionDigits: 2,
              type: 'centPrecision',
            },
          },
        ],
        images: [{ url: '/image.png', dimensions: { h: 100, w: 100 } }],
        attributes,
      },
    };
    const user = userEvent.setup();
    renderWithProviders(
      <ProductCard {...(productData as ProductProjection)} />,
    );

    const card = (await screen.findByRole('link')).firstChild as HTMLElement;

    await user.hover(card);
    expect(card.style.border).toBe('1px solid black');
  });
  it('should render product card based on passed product info', async () => {
    const productData: Pick<
    ProductProjection,
    'id' | 'name' | 'description' | 'masterVariant'
    > = {
      id: 'id',
      name: { 'en-US': 'Test data' },
      description: { 'en-US': 'Test description' },
      masterVariant: {
        id: 1,
        prices: [
          {
            id: 'price_id',
            value: {
              centAmount: 1000,
              currencyCode: 'USD',
              fractionDigits: 2,
              type: 'centPrecision',
            },
          },
        ],
        images: [{ url: '/image.png', dimensions: { h: 100, w: 100 } }],
        attributes,
      },
    };

    renderWithProviders(
      <ProductCard {...(productData as ProductProjection)} />,
    );

    expect(await screen.findByText('Test data')).toHaveTextContent('Test data');
    expect(await screen.findByText('Test descriptio...')).toHaveTextContent(
      'Test descriptio...',
    );
    expect(await screen.findByRole('link')).toHaveAttribute(
      'href',
      `/product/${productData.id}`,
    );
    expect(await screen.findByRole('img')).toHaveAttribute('src', '/image.png');
    expect(await screen.findByText('author_label,2000')).toHaveTextContent(
      'author_label,2000',
    );
    expect(await screen.findByText('10.00 USD')).toHaveTextContent('10.00 USD');
  });
});
