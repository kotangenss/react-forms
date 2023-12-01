export default function сonfirmPassword(value: string, password: string): boolean | string {
  if (value !== password) {
    return 'Passwords do not match';
  }
  return true;
}
