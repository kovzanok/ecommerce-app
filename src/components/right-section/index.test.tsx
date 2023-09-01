import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../test';
import RightSection, { RightSectionProps } from '.';

describe('RightSection', () => {
  it('should render all elements', async () => {
    const rightSectionProps: RightSectionProps = {
      typeOfValue: 'firstName',
      customerValue: 'Alex',
      formValue: 'Dimon',
      setFieldValue: () => {},
    };
    renderWithProviders(<RightSection {...rightSectionProps} />);

    expect(await screen.findByRole('button')).toBeInTheDocument();
  });
});
