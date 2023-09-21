import { screen } from '@testing-library/react';
import { GetInputProps } from '@mantine/form/lib/types';
import { vi } from 'vitest';
import { renderWithProviders } from '../../test';
import FilterForm from '.';
import { FilterParam, Filters } from '../../types';

describe('FilterForm', () => {
  const getInputProps: GetInputProps<Filters> = () => ({
    value: '',
    onChange: () => {},
    onBlur: () => {},
    error: '',
  });
  const filters: FilterParam[] = [
    {
      label: 'Cover',
      values: [
        { label: 'Hard cover', value: 'hard' },
        { label: 'Paperback', value: 'paper' },
      ],
      name: 'Cover',
    },
    {
      label: 'Author',
      values: [
        { label: 'Fyodor Dostoevsky', value: 'dostoevsky' },
        { label: 'Maxim Ilyakhov', value: 'ilyakhov' },
        { label: 'Ludmila Sarycheva', value: 'sarycheva' },
        { label: 'Benjamin Graham', value: 'graham' },
      ],
      name: 'Author',
    },
    {
      label: 'Age',
      values: [
        { label: '18+', value: '18' },
        { label: '16+', value: '16' },
        { label: '12+', value: '12' },
        { label: '6+', value: '6' },
        { label: '0+', value: '0' },
      ],
      name: 'Age_restrictions',
    },
    {
      label: 'Publisher',
      values: [
        { label: 'AST', value: 'ast' },
        { label: 'XL Media', value: 'xl-media' },
      ],
      name: 'publisher',
    },
  ];
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

  it('should render filter form', async () => {
    const filterFormProps = {
      filters,
      loading: false,
      getInputProps,
      onSubmit: () => {},
      reset: () => {},
    };
    renderWithProviders(<FilterForm {...filterFormProps} />);
    for (const filter of filters) {
      const { label } = filter;
      expect(await screen.findByLabelText(label)).toBeInTheDocument();
    }
    expect((await screen.findAllByRole('button'))[0]).toHaveTextContent(
      'Apply filters',
    );
    expect((await screen.findAllByRole('button'))[1]).toHaveTextContent(
      'Reset',
    );
  });
  it('should render disabled buttons and select during loading', async () => {
    const filterFormProps = {
      filters,
      loading: true,
      getInputProps,
      onSubmit: () => {},
      reset: () => {},
    };
    renderWithProviders(<FilterForm {...filterFormProps} />);
    for (const filter of filters) {
      const { label } = filter;
      expect(await screen.findByLabelText(label)).toBeDisabled();
    }
    expect((await screen.findAllByRole('button'))[0]).toBeDisabled();
    expect((await screen.findAllByRole('button'))[1]).toBeDisabled();
  });
});
