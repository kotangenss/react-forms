export default function acceptTerms(value: boolean): boolean | string {
  if (!value) {
    return 'You must accept the terms';
  }

  return true;
}
