import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './index';

describe('NotFoundPage', () => {
  it('should render page with link to main page', async () => {
    render(<NotFoundPage />, { wrapper: BrowserRouter });

    expect(
      await screen.findByText("Whoops, that page's gone."),
    ).toHaveTextContent("Whoops, that page's gone.");
    expect(await screen.findByRole('link')).toHaveAttribute('href', '/');
  });
});
