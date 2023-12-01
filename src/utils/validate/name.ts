export default function validateName(value: string): boolean | string {
  if (/^[a-zа-я]/.test(value)) {
    return 'The name must begin with a capital letter';
  }

  if (!/^[a-zA-Zа-яА-Я]+$/.test(value)) {
    return 'Name can only contain letters';
  }

  return true;
}
