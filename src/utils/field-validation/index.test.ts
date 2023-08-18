import { describe, it } from 'vitest';
import {
  validateBirthday,
  validatePostalCode,
  validateStreet,
  validateString,
} from '.';

describe('validateString', () => {
  it('should return error, if field is empty', () => {
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
  it('should pass validation', () => {
    const actual = 'Alexei';

    expect(validateString(actual)).toBe(undefined);
  });
});

describe('validateStreet', () => {
  it('should return error, if field is empty', () => {
    const actual = '';

    expect(validateStreet(actual)).toBe(
      'This field must contain at least one character',
    );
  });

  it('should pass validation', () => {
    const actual = 'Baker street';

    expect(validateStreet(actual)).toBe(undefined);
  });
});

describe('validateBirthday', () => {
  it('should return error, if field is empty', () => {
    const actual = '';

    expect(validateBirthday(actual)).toBe('Choose your age');
  });
  it('should return error, if user is younger then 13', () => {
    const actual = '2020-12-12';

    expect(validateBirthday(actual)).toBe(
      'A valid date input ensuring the user is above a 13',
    );
  });
  it('should pass validation', () => {
    const actual = '2000-12-12';

    expect(validateBirthday(actual)).toBe(undefined);
  });
});

describe('validatePostalCode', () => {
  it('should return error after incorrect postal code', () => {
    const actualPostalCode = '123456';
    const actualCountry = 'US';

    expect(validatePostalCode(actualPostalCode, actualCountry)).toBe(
      'This postal code is incorrect!',
    );
  });
  it('should pass validation', () => {
    const actualPostalCode = '12345';
    const actualCountry = 'US';

    expect(validatePostalCode(actualPostalCode, actualCountry)).toBe(undefined);
  });
});
