export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function validateContactForm(data: {
  email: string;
  firstName: string;
  lastName: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!validateRequired(data.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateRequired(data.firstName)) {
    errors.firstName = 'First name is required';
  }

  if (!validateRequired(data.lastName)) {
    errors.lastName = 'Last name is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}