const EMAIL_FORMAT_REGULAR = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';

const PASSWORD_MIN_LENGTH = 8;
const UPPER_CASE_REGULAR = /[A-Z]/;
const LOWER_CASE_REGULAR = /[a-z]/;
const DIGIT_REGULAR = /\d/;

const SPECIAL_CHARACTER_REGULAR = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
const AGE_REQUIREMENT = 13;
const CURRENT_AGE = (dateString: string): number => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
};

type ValidationReturnedType = string | undefined;

export const validateEmail = (value: string): ValidationReturnedType => {
  switch (false) {
    case value.trim() === value:
      return 'Email address must not contain leading or trailing whitespace';
    case value.includes('@'):
      return 'Email address must contain an "@" symbol separating local part and domain name';
    case value.split('@')[1].split('.').length === 2:
      return 'Email address must contain a domain name';
    case EMAIL_FORMAT_REGULAR.test(value):
      return 'Email address must be properly formatted';
    default:
      return undefined;
  }
};

export const validatePassword = (value: string): ValidationReturnedType => {
  switch (false) {
    case value.length >= PASSWORD_MIN_LENGTH:
      return 'Password must be at least 8 characters long';
    case value.trim() === value:
      return 'Password must not contain leading or trailing whitespace';
    case UPPER_CASE_REGULAR.test(value):
      return 'Password must contain at least one uppercase letter (A-Z)';
    case LOWER_CASE_REGULAR.test(value):
      return 'Password must contain at least one lowercase letter (a-z)';
    case DIGIT_REGULAR.test(value):
      return 'Password must contain at least one digit (0-9)';
    case SPECIAL_CHARACTER_REGULAR.test(value):
      return 'Password must contain at least one special character (e.g., !@#$%^&*)';
    default:
      return undefined;
  }
};

export const validateString = (val: string): ValidationReturnedType => {
  switch (true) {
    case val.length === 0:
      return 'This field must contain at least one character';
    case SPECIAL_CHARACTER_REGULAR.test(val) || DIGIT_REGULAR.test(val):
      return 'This field must contain no special characters or numbers';
    default:
      return undefined;
  }
};

export const validateStreet = (val: string): ValidationReturnedType => {
  if (val.length === 0) {
    return 'This field must contain at least one character';
  }
};

export const validateBirthday = (val: string): ValidationReturnedType => {
  switch (true) {
    case val.length === 0:
      return 'Choose your age';
    case CURRENT_AGE(val) <= AGE_REQUIREMENT:
      return 'A valid date input ensuring the user is above a 13';
    default:
      return undefined;
  }
};

export const validatePostalCode = (
  val: string,
  country: string,
): ValidationReturnedType => {
  const isPostalCorrect = postcodeValidatorExistsForCountry(country)
    && postcodeValidator(val, country);

  return !isPostalCorrect ? 'This postal code is incorrect!' : undefined;
};
