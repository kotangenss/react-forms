import React from 'react';
import { InputProps } from '../../interfaces/input';

const CheckboxInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, id, className } = props;

  return (
    <div className={className}>
      <label htmlFor={id}>
        <input type="checkbox" id={id} ref={ref} />
        {label}
      </label>
    </div>
  );
});

export default CheckboxInput;
