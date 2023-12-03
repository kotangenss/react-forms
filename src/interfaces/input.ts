import { UseFormRegisterReturn } from 'react-hook-form';
import { DataControlled } from './formData';

export interface InputProps {
  label: string;
  id: string;
  className?: string;
  classNameInput?: string;
  classNameLabel?: string;
  placeholder?: string;
  name?: string;
  type?: string;
  ref?: React.RefObject<HTMLInputElement>;
  value?: string;
  checked?: boolean;
  accept?: string;
  options?: string[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputPropsControlled extends InputProps {
  hookData: object;
  errorMessage?: string;
}

export interface InputAutocompleteProps {
  items: string[];
  label: string;
  id: string;
  classNameInput: string;
  classNameLabel: string;
  classNameList: string;
  classNameListItem: string;
}

export interface InputAutocompletePropsUncontrolled extends InputAutocompleteProps {
  onSuggestionSelected: (value: string) => void;
}

export interface InputAutocompletePropsControlled extends InputAutocompleteProps {
  hookData: UseFormRegisterReturn<'country'>;
  errorMessage?: string;
  setValue: (name: keyof DataControlled, value: string) => void;
}

export interface InputSelectProps extends InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
