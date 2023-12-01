import countryList from '../countries';

export default function validateAutocomplete(value: string): boolean | string {
  if (!countryList.includes(value)) {
    return 'Please select from the provided list';
  }

  return true;
}
