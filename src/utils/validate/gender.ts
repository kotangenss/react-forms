export default function validateGender(value: string): boolean {
  if (value.trim() === '') {
    return false;
  }
  return true;
}
