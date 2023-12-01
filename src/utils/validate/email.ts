export default function validateEmail(value: string): boolean | string {
  if (!value.includes('@')) {
    return 'Email must contain "@"';
  }

  const indexOfAtSymbol = value.indexOf('@');
  const beforeAtSymbol = value.substring(0, indexOfAtSymbol);
  const afterAtSymbol = value.substring(indexOfAtSymbol + 1);

  if (beforeAtSymbol.length === 0) {
    return 'There should be at least one character before "@"';
  }

  if (!afterAtSymbol.includes('.')) {
    return 'Email must contain at least one dot after "@"';
  }

  if (value.trim() !== value) {
    return 'Password must not contain leading or trailing spaces';
  }

  if (afterAtSymbol.indexOf('.') === afterAtSymbol.length - 2) {
    return 'There should be at least two characters after the dot in the email';
  }

  if (!value.match(/@([-A-Za-z]+\.){1,2}[-A-Za-z]{2,}$/)) {
    return 'Enter a valid domain for the email address, e.g. user@example.com';
  }

  return true;
}
