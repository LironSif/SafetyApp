import { validateLoginForm, validateSignupForm } from '../Formvalidation.js';

describe('validateLoginForm', () => {
  test('returns errors for empty fields', () => {
    const formData = { email: '', password: '' };
    const { isValid, errors } = validateLoginForm(formData);
    expect(isValid).toBe(false);
    expect(errors).toEqual({
      email: 'Email cannot be empty',
      password: 'Password cannot be empty',
    });
  });

  test('returns valid for correct data', () => {
    const formData = { email: 'user@example.com', password: 'Password1' };
    const { isValid, errors } = validateLoginForm(formData);
    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });
});

describe('validateSignupForm', () => {
  test('returns errors for invalid data', () => {
    const formData = {
      email: 'bad',
      password: 'short',
      name: '',
      termsAccepted: false,
      recaptchaToken: '',
    };
    const { isValid, errors } = validateSignupForm(formData);
    expect(isValid).toBe(false);
    expect(errors).toMatchObject({
      email: 'Email is not valid',
      password:
        'Password must be at least 8 characters long and include at least one number, one lowercase and one uppercase letter.',
      name: 'Name cannot be empty',
      termsAccepted: 'You must accept the terms and conditions',
      recaptchaToken: 'Please verify you are not a robot',
    });
  });

  test('returns valid for all correct data', () => {
    const formData = {
      email: 'user@example.com',
      password: 'Password1',
      name: 'User',
      termsAccepted: true,
      recaptchaToken: 'token',
    };
    const { isValid, errors } = validateSignupForm(formData);
    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });
});
