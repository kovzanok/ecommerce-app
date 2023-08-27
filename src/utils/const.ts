import { createStyles } from '@mantine/core';

const bookCategoryId = '54ed4eb1-eb67-4634-840e-5feb8b836ff6';

export default bookCategoryId;

export const countryNames = [
  {
    id: 'RU',
    name: 'Russia',
  },
  {
    id: 'BY',
    name: 'Belarus',
  },
  {
    id: 'PL',
    name: 'Poland',
  },
  {
    id: 'US',
    name: 'United States of America',
  },
];

export const useDisabledStyles = createStyles(() => ({
  input: {
    '&:disabled': {
      backgroundColor: '#dcdcdc99',
      color: '#000000b3',
      opacity: '1',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },

    ':checked': {
      backgroundColor: '#228be6',
    },

    ':disabled + .___ref-icon': {
      color: '#fff',
    },
  },
  radio: {
    '&:disabled': {
      backgroundColor: '#fff',
      color: '#000',
      opacity: '1',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },

    ':checked': {
      backgroundColor: '#228be6',
    },
  },
  label: {
    color: '#000 !important',
  },
}));
