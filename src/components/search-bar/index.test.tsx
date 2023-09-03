import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import SearchBar from '.';

describe('SearchBar', () => {
  it('should render search bar', async () => {
    const searchBarProps = {
      handleSearch: () => {},
      handleClear: () => {},
      handleChange: () => {},
      loading: false,
      value: 'value',
    };
    renderWithProviders(<SearchBar {...searchBarProps} />);

    expect(await screen.findByRole('button')).toHaveTextContent('Search');
    expect(await screen.findByRole('textbox')).toHaveAttribute(
      'value',
      'value',
    );
  });
  it('should render disabled input and button during loading', async () => {
    const searchBarProps = {
      handleSearch: () => {},
      handleClear: () => {},
      handleChange: () => {},
      loading: true,
      value: '',
    };

    renderWithProviders(<SearchBar {...searchBarProps} />);

    expect(await screen.findByRole('button')).toBeDisabled();
    expect(await screen.findByRole('textbox')).toBeDisabled();
  });
});
