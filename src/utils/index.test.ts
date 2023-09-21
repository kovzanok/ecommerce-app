import {
  AttributeDefinition,
  Category,
  CustomerDraft,
} from '@commercetools/platform-sdk';
import {
  areNotValuesEquals,
  dateConverter,
  isInstanceOfDate,
  transformRegistrationData,
  capitalize,
  createCategoryMap,
  createQueryString,
  getFilterParams,
  getProductAttribute,
  calculatePagination,
  calculateTotal,
} from './index';
import {
  AuthorType, Filters, FormValues, ProductAttributes,
} from '../types';

describe('capitalize', () => {
  it('should capitalize string', () => {
    expect(capitalize('string')).toBe('String');
  });
});

describe('getProductAttribute', () => {
  it('should return certain attribute', () => {
    const author: AuthorType = {
      name: 'Author',
      value: { key: 'author_key', label: 'author_label' },
    };
    const attributes: ProductAttributes = [
      {
        name: 'Published',
        value: 2000,
      },
      { name: 'Cover', value: { key: 'cover_key', label: 'cover_label' } },
      author,
      {
        name: 'Age_restrictions',
        value: { key: 'age_key', label: 'age_label' },
      },
      {
        name: 'publisher',
        value: { key: 'publisher_key', label: 'publisher_label' },
      },
    ];
    expect(getProductAttribute<AuthorType>(attributes, 'Author')).toBe(author);
  });
});

describe('createQueryString', () => {
  it('should create query string based on filters', () => {
    const filters: Filters = {
      Age_restrictions: '18',
      Author: 'author',
      Cover: 'paper',
      price: {
        max: 20,
        min: 0,
      },
      publisher: 'smt',
    };
    expect(createQueryString(filters)).toStrictEqual([
      'variants.attributes.Age_restrictions.key:"18"',
      'variants.attributes.Author.key:"author"',
      'variants.attributes.Cover.key:"paper"',
      `variants.price.centAmount:range (${0 * 100} to ${20 * 100})`,
      'variants.attributes.publisher.key:"smt"',
    ]);
  });
  it('should create query string with some empty filters', () => {
    const filters: Filters = {
      Age_restrictions: '',
      Author: 'author',
      Cover: '',
      price: {
        max: 20,
        min: 0,
      },
      publisher: 'smt',
    };
    expect(createQueryString(filters)).toStrictEqual([
      '',
      'variants.attributes.Author.key:"author"',
      '',
      `variants.price.centAmount:range (${0 * 100} to ${20 * 100})`,
      'variants.attributes.publisher.key:"smt"',
    ]);
  });
});

describe('getFilterParams', () => {
  const attributes: AttributeDefinition[] = [
    {
      name: 'Published',
      label: {
        'en-US': 'published',
      },
      inputTip: {
        'en-US': '',
      },
      isRequired: true,
      type: {
        name: 'number',
      },
      attributeConstraint: 'None',
      isSearchable: true,
      inputHint: 'SingleLine',
    },
    {
      name: 'Cover',
      label: {
        'en-US': 'cover',
      },
      inputTip: {
        'en-US': '',
      },
      isRequired: true,
      type: {
        name: 'enum',
        values: [
          {
            key: 'hard',
            label: 'Hard cover',
          },
          {
            key: 'paper',
            label: 'Paperback',
          },
        ],
      },
      attributeConstraint: 'None',
      isSearchable: true,
      inputHint: 'SingleLine',
    },
    {
      name: 'Author',
      label: {
        'en-US': 'author',
      },
      inputTip: {
        'en-US': '',
      },
      isRequired: true,
      type: {
        name: 'enum',
        values: [
          {
            key: 'dostoevsky',
            label: 'Fyodor Dostoevsky',
          },
          {
            key: 'ilyakhov',
            label: 'Maxim Ilyakhov',
          },
          {
            key: 'sarycheva',
            label: 'Ludmila Sarycheva',
          },
          {
            key: 'graham',
            label: 'Benjamin Graham',
          },
        ],
      },
      attributeConstraint: 'None',
      isSearchable: true,
      inputHint: 'SingleLine',
    },
    {
      name: 'Age_restrictions',
      label: {
        'en-US': 'age',
      },
      inputTip: {
        'en-US': '',
      },
      isRequired: true,
      type: {
        name: 'enum',
        values: [
          {
            key: '18',
            label: '18+',
          },
          {
            key: '16',
            label: '16+',
          },
          {
            key: '12',
            label: '12+',
          },
          {
            key: '6',
            label: '6+',
          },
          {
            key: '0',
            label: '0+',
          },
        ],
      },
      attributeConstraint: 'None',
      isSearchable: true,
      inputHint: 'SingleLine',
    },
    {
      name: 'publisher',
      label: {
        'en-US': 'Publisher',
      },
      inputTip: {
        'en-US': '',
      },
      isRequired: true,
      type: {
        name: 'enum',
        values: [
          {
            key: 'ast',
            label: 'AST',
          },
          {
            key: 'xl-media',
            label: 'XL Media',
          },
        ],
      },
      attributeConstraint: 'None',
      isSearchable: true,
      inputHint: 'SingleLine',
    },
  ];

  it('should return filter params based on product attributes', () => {
    const expected = [
      {
        label: 'cover',
        values: [
          { label: 'Hard cover', value: 'hard' },
          { label: 'Paperback', value: 'paper' },
        ],
        name: 'Cover',
      },
      {
        label: 'author',
        values: [
          { label: 'Fyodor Dostoevsky', value: 'dostoevsky' },
          { label: 'Maxim Ilyakhov', value: 'ilyakhov' },
          { label: 'Ludmila Sarycheva', value: 'sarycheva' },
          { label: 'Benjamin Graham', value: 'graham' },
        ],
        name: 'Author',
      },
      {
        label: 'age',
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
    expect(getFilterParams(attributes)).toStrictEqual(expected);
  });
});

describe('createCategoryMap', () => {
  const fiction: Category = {
    id: '855a568c-1871-4550-a4de-bfd88b7d904f',
    version: 4,
    createdAt: '2023-08-07T07:00:39.737Z',
    lastModifiedAt: '2023-08-07T08:05:18.980Z',

    key: 'fiction',
    name: {
      'en-US': 'Fiction',
    },
    slug: {
      'en-US': 'fiction',
    },
    ancestors: [
      {
        typeId: 'category',
        id: '54ed4eb1-eb67-4634-840e-5feb8b836ff6',
      },
    ],
    parent: {
      typeId: 'category',
      id: '54ed4eb1-eb67-4634-840e-5feb8b836ff6',
    },
    orderHint: '0.06',
    assets: [],
  };
  const detective: Category = {
    id: 'f98e56a7-678f-4ebd-8258-d00acdb65312',
    version: 1,
    createdAt: '2023-08-08T21:34:41.715Z',
    lastModifiedAt: '2023-08-08T21:34:41.715Z',
    key: 'detective',
    name: {
      'en-US': 'Detective',
    },
    slug: {
      'en-US': 'detective',
    },
    ancestors: [
      {
        typeId: 'category',
        id: '54ed4eb1-eb67-4634-840e-5feb8b836ff6',
      },
      {
        typeId: 'category',
        id: '855a568c-1871-4550-a4de-bfd88b7d904f',
      },
    ],
    parent: {
      typeId: 'category',
      id: '855a568c-1871-4550-a4de-bfd88b7d904f',
    },
    orderHint: '0.06',
    assets: [],
  };
  const manga: Category = {
    id: 'abe6465e-3bfd-46bc-8a69-f4ec5d2c9998',
    version: 2,

    createdAt: '2023-08-08T21:34:41.864Z',
    lastModifiedAt: '2023-08-08T21:59:26.946Z',

    key: 'comics-manga-ranobe',
    name: {
      'en-US': 'Manga',
    },
    slug: {
      'en-US': 'comics-manga-ranobe',
    },
    ancestors: [
      {
        typeId: 'category',
        id: '54ed4eb1-eb67-4634-840e-5feb8b836ff6',
      },
      {
        typeId: 'category',
        id: '855a568c-1871-4550-a4de-bfd88b7d904f',
      },
    ],
    parent: {
      typeId: 'category',
      id: '855a568c-1871-4550-a4de-bfd88b7d904f',
    },
    orderHint: '0.06',
    assets: [],
  };
  const categories: Category[] = [fiction, detective, manga];
  it('should return nested category tree based on provided categories', () => {
    const expected = new Map([[fiction, [detective, manga]]]);
    expect(createCategoryMap(categories)).toStrictEqual(expected);
  });
});

describe('dateConverter', () => {
  const testCases = [
    {
      input: new Date('Wed Aug 30 2023 12:55:35'),
      output: '2023-08-30',
    },
    {
      input: new Date('1/12/2023'),
      output: '2023-01-12',
    },
    {
      input: new Date('2023-08-30'),
      output: '2023-08-30',
    },
    {
      input: new Date('2022-01-30T10:02:08.865Z'),
      output: '2022-01-30',
    },
  ];
  it.each(testCases)(
    'should return date with zero at the start and in right format ($input -> $output)',
    ({ input, output }) => {
      expect(dateConverter(input)).toBe(output);
    },
  );
});

describe('isInstanceOfDate', () => {
  type TestCasesType = {
    input: string | Date | undefined;
    output: boolean;
  };
  const testCases: TestCasesType[] = [
    {
      input: new Date('Wed Aug 30 2023 12:55:35'),
      output: true,
    },
    {
      input: undefined,
      output: false,
    },
    {
      input: '2023-08-30',
      output: false,
    },
    {
      input: new Date('2022-01-30T10:02:08.865Z'),
      output: true,
    },
  ];
  it.each(testCases)(
    'should return boolean value, instance of Date or not ($input === $output)',
    ({ input, output }) => {
      expect(isInstanceOfDate(input)).toBe(output);
    },
  );
});

describe('areNotValuesEquals', () => {
  type TestCasesType = {
    input: {
      currentValue: string | Date | undefined;
      defaultValue: string | undefined;
    };
    output: boolean;
  };
  const testCases: TestCasesType[] = [
    {
      input: {
        currentValue: 'Minsk',
        defaultValue: 'Minsk',
      },
      output: false,
    },
    {
      input: {
        currentValue: new Date('Wed Aug 30 2023 12:55:35'),
        defaultValue: 'Wed Aug 30 2023 12:55:35',
      },
      output: false,
    },
    {
      input: {
        currentValue: new Date('Wed Aug 30 2023 12:55:35'),
        defaultValue: 'Wed Aug 31 2023 12:55:35',
      },
      output: true,
    },
    {
      input: {
        currentValue: undefined,
        defaultValue: undefined,
      },
      output: false,
    },
    {
      input: {
        currentValue: 'Minsk',
        defaultValue: 'Hrodno',
      },
      output: true,
    },
  ];
  it.each(testCases)(
    'should return true, if values are not equals ($input !== $output)',
    ({ input, output }) => {
      expect(areNotValuesEquals(input.currentValue, input.defaultValue)).toBe(
        output,
      );
    },
  );
});

describe('transformRegistrationData', () => {
  type TestCasesType = {
    input: {
      data: FormValues;
      isSame: boolean;
    };
    output: CustomerDraft;
  };
  const testCases: TestCasesType[] = [
    {
      input: {
        data: {
          firstName: 'Fedor',
          lastName: 'Pechkin',
          email: 'fedorpechkin@mail.ru',
          password: 'letter_to_dyadya',
          dateOfBirthday: 'Wed Aug 23 2005',

          shippingAddress: {
            country: 'Belarus',
            postalCode: '123456',
            city: 'Minsk',
            streetName: 'Bogushevicha st.',
            isAddressDefault: true,
          },

          billingAddress: {
            country: '',
            postalCode: '',
            city: '',
            streetName: '',
            isAddressDefault: true,
          },
        },
        isSame: true,
      },
      output: {
        firstName: 'Fedor',
        lastName: 'Pechkin',
        email: 'fedorpechkin@mail.ru',
        password: 'letter_to_dyadya',
        dateOfBirth: '2005-08-23',
        addresses: [
          {
            country: 'Belarus',
            postalCode: '123456',
            city: 'Minsk',
            streetName: 'Bogushevicha st.',
          },
        ],
        shippingAddresses: [0],
        billingAddresses: [0],
        defaultShippingAddress: 0,
        defaultBillingAddress: 0,
      },
    },
    {
      input: {
        data: {
          firstName: 'Fedor',
          lastName: 'Pechkin',
          email: 'fedorpechkin@mail.ru',
          password: 'letter_to_dyadya',
          dateOfBirthday: 'Wed Aug 23 2005',

          shippingAddress: {
            country: 'Belarus',
            postalCode: '123456',
            city: 'Minsk',
            streetName: 'Bogushevicha st.',
            isAddressDefault: true,
          },

          billingAddress: {
            country: 'United states of America',
            postalCode: '12345',
            city: 'Minnisota',
            streetName: 'Siett st.',
            isAddressDefault: true,
          },
        },
        isSame: false,
      },
      output: {
        firstName: 'Fedor',
        lastName: 'Pechkin',
        email: 'fedorpechkin@mail.ru',
        password: 'letter_to_dyadya',
        dateOfBirth: '2005-08-23',
        addresses: [
          {
            country: 'Belarus',
            postalCode: '123456',
            city: 'Minsk',
            streetName: 'Bogushevicha st.',
          },
          {
            country: 'United states of America',
            postalCode: '12345',
            city: 'Minnisota',
            streetName: 'Siett st.',
          },
        ],
        shippingAddresses: [0],
        billingAddresses: [1],
        defaultShippingAddress: 0,
        defaultBillingAddress: 1,
      },
    },
    {
      input: {
        data: {
          firstName: 'Fedor',
          lastName: 'Pechkin',
          email: 'fedorpechkin@mail.ru',
          password: 'letter_to_dyadya',
          dateOfBirthday: 'Wed Aug 23 2005',

          shippingAddress: {
            country: 'Belarus',
            postalCode: '123456',
            city: 'Minsk',
            streetName: 'Bogushevicha st.',
            isAddressDefault: false,
          },

          billingAddress: {
            country: 'United states of America',
            postalCode: '12345',
            city: 'Minnisota',
            streetName: 'Siett st.',
            isAddressDefault: false,
          },
        },
        isSame: false,
      },
      output: {
        firstName: 'Fedor',
        lastName: 'Pechkin',
        email: 'fedorpechkin@mail.ru',
        password: 'letter_to_dyadya',
        dateOfBirth: '2005-08-23',
        addresses: [
          {
            country: 'Belarus',
            postalCode: '123456',
            city: 'Minsk',
            streetName: 'Bogushevicha st.',
          },
          {
            country: 'United states of America',
            postalCode: '12345',
            city: 'Minnisota',
            streetName: 'Siett st.',
          },
        ],
        shippingAddresses: [0],
        billingAddresses: [1],
        defaultShippingAddress: undefined,
        defaultBillingAddress: undefined,
      },
    },
  ];
  it.each(testCases)(
    'should return Customer draft object',
    ({ input, output }) => {
      expect(transformRegistrationData(input.data, input.isSame)).toStrictEqual(
        output,
      );
    },
  );
});

describe('calculatePagination', () => {
  type TestCasesType = {
    input: {
      current: number;
      limit: number;
    };
    output: [number, number];
  };
  const testCases: TestCasesType[] = [
    {
      input: {
        current: 2,
        limit: 5,
      },
      output: [5, 10],
    },
    {
      input: {
        current: 1,
        limit: 10,
      },
      output: [0, 10],
    },
    {
      input: {
        current: 10,
        limit: 2,
      },
      output: [18, 20],
    },
  ];
  it.each(testCases)(
    'should return array of correct current and limit values',
    ({ input, output }) => {
      expect(calculatePagination(input)).toStrictEqual(output);
    },
  );
});

describe('calculateTotal', () => {
  type TestCasesType = {
    input: {
      total: number;
      limit: number;
    };
    output: number;
  };
  const testCases: TestCasesType[] = [
    {
      input: {
        total: 2,
        limit: 5,
      },
      output: 1,
    },
    {
      input: {
        total: 1,
        limit: 1,
      },
      output: 1,
    },
    {
      input: {
        total: 10,
        limit: 2,
      },
      output: 5,
    },
    {
      input: {
        total: 7,
        limit: 2,
      },
      output: 4,
    },
  ];
  it.each(testCases)(
    'should return number of total pages ($output)',
    ({ input, output }) => {
      expect(calculateTotal(input.total, input.limit)).toBe(output);
    },
  );
});
