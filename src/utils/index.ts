
export function sanitizePhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/[^\d]/g, '');
}
