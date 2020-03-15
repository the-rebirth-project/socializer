export const composeValidators = (...validators: any[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const required = (value: any) => (value ? undefined : 'Required');

export const noWhitespace = (value: any) =>
  /\s/g.test(value) ? 'No spaces allowed' : undefined;

export const passwordValidator = (value: string) =>
  value.length > 8 ? undefined : 'Must be more than 8 characters';

export const emailValidator = (value: string) =>
  /\s/g.test(value) || !value.includes('@') ? 'Invalid email' : undefined;

export const minChar = (min: number) => (value: string) =>
  value.length >= min ? undefined : `Must be more than ${min - 1} characters`;

export const maxChar = (max: number) => (value: string) =>
  value.length <= max ? undefined : `Must be less than ${max - 1} characters`;
