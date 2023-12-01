import React from 'react';
import { InputProps } from '../../../../interfaces/input';

const RadioInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, id, name, value, checked, className, onChange } = props;

  return (
    <div className={className}>
      <input
        type="radio"
        id={id}
        name={name}
        ref={ref}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
});

export default RadioInput;
