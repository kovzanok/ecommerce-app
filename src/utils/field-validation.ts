const EMAIL_FORMAT_REGULAR = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PASSWORD_MIN_LENGTH = 8;
const UPPER_CASE_REGULAR = /[A-Z]/;
const LOWER_CASE_REGULAR = /[a-z]/;
const DIGIT_REGULAR = /\d/;
const SPECIAL_CHARACTER_REGULAR = /!|@|#|\$|%|\^|&|\*/;

export const validateEmail = (value: string): string | undefined => {
  switch (false) {
    case value.trim() === value:
      return 'Email address must not contain leading or trailing whitespace';
    case value.includes('@'):
      return 'Email address must contain an "@" symbol separating local part and domain name';
    case value.split('@')[1].split('.').length === 2:
      return 'Email address must contain a domain name';
    case EMAIL_FORMAT_REGULAR.test(value):
      return 'Email address must be properly formatted';
  }
};

export const validatePassword = (value: string): string | undefined => {
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
  }
};
