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
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
