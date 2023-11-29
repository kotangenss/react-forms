import React from 'react';
import { InputProps } from '../../../interfaces/input';

const CheckboxInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, id, className, onChange } = props;

  return (
    <div className={className}>
      <label htmlFor={id}>
        <input type="checkbox" id={id} ref={ref} onChange={onChange} />
        {label}
      </label>
    </div>
  );
});

export default CheckboxInput;
