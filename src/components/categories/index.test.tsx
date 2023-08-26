import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Category } from '@commercetools/platform-sdk';
import { renderWithProviders } from '../../test';
import Categories from '.';
import ApiService from '../../service/api-service';

vi.mock('../../service/api-service');

describe('Categories', () => {
  const categories: Category[] = [
    {
      id: 'id1',
      ancestors: [],
      createdAt: 'created',
      lastModifiedAt: 'modified',
      name: { 'en-US': 'Category1' },
      version: 1,
      slug: { 'en-US': 'slug1' },
      orderHint: '1',
    },
    {
      id: 'id2',
      ancestors: [],
      createdAt: 'created',
      lastModifiedAt: 'modified',
      name: { 'en-US': 'Category2' },
      version: 1,
      slug: { 'en-US': 'slug2' },
      orderHint: '2',
      parent: {
        id: 'id1',
        typeId: 'category',
      },
    },
    {
      id: 'id3',
      ancestors: [],
      createdAt: 'created',
      lastModifiedAt: 'modified',
      name: { 'en-US': 'Category3' },
      version: 1,
      slug: { 'en-US': 'slug3' },
      orderHint: '3',
      parent: {
        id: 'id1',
        typeId: 'category',
      },
    },
  ];
  it('should render categories list', async () => {
    ApiService.getCategories = vi
      .mocked(ApiService.getCategories)
      .mockResolvedValueOnce(categories);
    renderWithProviders(<Categories />);

    for (const category of categories) {
      expect(await screen.findByText(category.name['en-US'])).toHaveAttribute(
        'href',
        `/catalog/${category.id}`,
      );
      expect(await screen.findByText(category.name['en-US'])).toHaveTextContent(
        category.name['en-US'],
      );
    }
  });
});
