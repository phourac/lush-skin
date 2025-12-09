// Remove all non-numeric characters
export const sanitizePhoneInput = (value: string) => {
  return value.replace(/\D/g, '');
};

// Cambodian phone number validation: 8–9 digits, optional leading 0
export const validateKhPhone = (value: string) => {
  const cleaned = value.replace(/\D/g, '');

  if (!cleaned) return 'Phone number is required';
  if (cleaned.length > 10) return 'Phone number too long';

  const khPattern = /^(0?[1-9]\d{7,8}|[1-9]\d{7,8})$/;
  if (!khPattern.test(cleaned)) return 'Invalid Cambodian phone number';

  return true;
};
