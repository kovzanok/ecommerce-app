import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Category } from '@commercetools/platform-sdk';
import { renderWithProviders } from '../../test';
import ApiService from '../../service/api-service';
import CustomBreadcrumbs from '.';

vi.mock('../../service/api-service');
describe('CustomBreadcrumbs', () => {
  it('should render breadcrumbs', async () => {
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
      },
    ];
    ApiService.getCategoryChain = vi
      .mocked(ApiService.getCategoryChain)
      .mockResolvedValue(categories);
    await act(async () => renderWithProviders(<CustomBreadcrumbs />));
    expect(screen.getByText('Category1')).toBeInTheDocument();
    expect(screen.getByText('Category2')).toBeInTheDocument();
  });
});
