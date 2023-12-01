export default function validateAge(value: string): boolean | string {
  const ageValue = parseInt(value, 10);

  if (ageValue % 1 !== 0) {
    return 'Age must be an integer';
  }

  if (ageValue < 0) {
    return 'Age must be a non-negative number';
  }

  if (Object.is(ageValue, -0)) {
    return 'Age must be a non-negative number';
  }

  return true;
}
