import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import HeaderLink from '.';

describe('HeaderLink', () => {
  it('should render link with provided text, url and icon', async () => {
    const linkProps = {
      to: '/url',
      text: 'Test',
      icon: <div>Icon</div>,
    };
    renderWithProviders(<HeaderLink {...linkProps} />);
    expect(await screen.findByText('Test')).toHaveTextContent(linkProps.text);
    expect(await screen.findByRole('link')).toHaveAttribute(
      'href',
      linkProps.to,
    );
    expect(await screen.findByText('Icon')).toBeInTheDocument();
  });
});
