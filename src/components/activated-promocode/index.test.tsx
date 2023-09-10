import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import ActivatedPromocode, { ActivatedPromocodeProps } from '.';

describe('Activated promocode', () => {
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

  it('should render page with actions buttons', async () => {
    const activatedPromocodeProps: ActivatedPromocodeProps = {
      promoName: 'COOL_SALE',
      discountCode: {
        typeId: 'discount-code',
        id: '1a-2b-3c-4d',
      },
    };
    renderWithProviders(<ActivatedPromocode {...activatedPromocodeProps} />);
    const promoBadge: HTMLElement = await screen.findByText('COOL_SALE');
    expect(promoBadge).toBeInTheDocument();

    const actionButton: HTMLElement = await screen.findByRole('button');
    expect(actionButton).toBeInTheDocument();
  });
  it('should click on the remove promo button', async () => {
    const activatedPromocodeProps: ActivatedPromocodeProps = {
      promoName: 'COOL_SALE',
      discountCode: {
        typeId: 'discount-code',
        id: '1a-2b-3c-4d',
      },
    };
    renderWithProviders(<ActivatedPromocode {...activatedPromocodeProps} />);

    const actionButton: HTMLElement = await screen.findByRole('button');
    fireEvent.click(actionButton);
  });
});
