import React, { ChangeEvent, Ref } from 'react';
import { InputProps } from '../../../interfaces/input';

const SelectInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, id, placeholder, className, options, onChange } = props;

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={className}>
      <label htmlFor={id}>{label}:</label>
      <select
        id={id}
        ref={ref as Ref<HTMLSelectElement>}
        onChange={handleSelectChange}
        defaultValue=""
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SelectInput;
