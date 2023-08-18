import { describe, it } from 'vitest';
import {
  validateBirthday,
  validatePostalCode,
  validateStreet,
  validateString,
} from '.';

describe('validateString', () => {
  it('field is empty', () => {
    const actual = '';

    expect(validateString(actual)).toBe(
      'This field must contain at least one character',
    );
  });
  it('field has special characters', () => {
    const actual = 'St$reet';

    expect(validateString(actual)).toBe(
      'This field must contain no special characters or numbers',
    );
  });
  it('field is valid', () => {
    const actual = 'Alexei';

    expect(validateString(actual)).toBe(undefined);
  });
});

describe('validateStreet', () => {
  it('field is empty', () => {
    const actual = '';

    expect(validateStreet(actual)).toBe(
      'This field must contain at least one character',
    );
  });

  it('field is valid', () => {
    const actual = 'Baker street';

    expect(validateStreet(actual)).toBe(undefined);
  });
});

describe('validateBirthday', () => {
  it('field is empty', () => {
    const actual = '';

    expect(validateBirthday(actual)).toBe('Choose your age');
  });
  it('user is younger a 13', () => {
    const actual = '2020-12-12';

    expect(validateBirthday(actual)).toBe(
      'A valid date input ensuring the user is above a 13',
    );
  });
  it('field is valid', () => {
    const actual = '2000-12-12';

    expect(validateBirthday(actual)).toBe(undefined);
  });
});

describe('validatePostalCode', () => {
  it('postalCode is incorrect', () => {
    const actualPostalCode = '123456';
    const actualCountry = 'US';

    expect(validatePostalCode(actualPostalCode, actualCountry)).toBe(
      'This postal code is incorrect!',
    );
  });
  it('postalCode is valid', () => {
    const actualPostalCode = '12345';
    const actualCountry = 'US';

    expect(validatePostalCode(actualPostalCode, actualCountry)).toBe(undefined);
  });
});
