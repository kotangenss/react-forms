import React from 'react';
import { InputProps } from '../../../../interfaces/input';

const TextInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, type, classNameInput, classNameLabel, id, placeholder, onChange } = props;

  return (
    <div>
      <label htmlFor={id} className={classNameLabel}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={classNameInput}
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
});

export default TextInput;
