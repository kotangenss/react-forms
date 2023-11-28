import React from 'react';
import { InputProps } from '../../interfaces/input';

const SelectInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, id, className, options } = props;

  return (
    <div className={className}>
      <label htmlFor={id}>{label}:</label>
      <input type="text" id={id} list={`${id}-list`} ref={ref} />
      <datalist id={`${id}-list`}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </datalist>
    </div>
  );
});

export default SelectInput;
