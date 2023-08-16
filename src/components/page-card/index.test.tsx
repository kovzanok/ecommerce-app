import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { PageLink } from '../../types';
import PageCard from '.';

describe('PageCard', () => {
  it('should render card with provided page info', async () => {
    const pageCardInfo: PageLink = {
      to: '/path',
      name: 'Title',
      description: 'Text',
    };

    render(<PageCard {...pageCardInfo} />, { wrapper: BrowserRouter });
    expect(await screen.findByText(pageCardInfo.name)).toHaveTextContent(
      pageCardInfo.name,
    );
    expect(await screen.findByText(pageCardInfo.description)).toHaveTextContent(
      pageCardInfo.description,
    );
    expect(await screen.findByRole('link')).toHaveAttribute(
      'href',
      pageCardInfo.to,
    );
  });
  it('should change background color on hover', async () => {
    const pageCardInfo: PageLink = {
      to: 'path',
      name: 'Title',
      description: 'Text',
    };
    const user = userEvent.setup();
    render(<PageCard {...pageCardInfo} />, { wrapper: BrowserRouter });
    const card = (await screen.findByRole('link')).firstChild as HTMLElement;
    await user.hover(card);
    expect(card.style.backgroundColor).toBe('rgba(0, 0, 0, 0.035)');
  });
});
