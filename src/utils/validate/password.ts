export default function validatePassword(value: string): boolean | string {
  if (!/\d/.test(value)) {
    return 'Password must contain at least one digit';
  }

  if (!/[A-Z]/.test(value)) {
    return 'Password must contain at least one uppercase letter';
  }

  if (!/[a-z]/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  }

  if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value)) {
    return 'Password must contain at least one special character';
  }

  return true;
}
