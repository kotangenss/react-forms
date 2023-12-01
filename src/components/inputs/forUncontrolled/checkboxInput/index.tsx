import React from 'react';
import { InputProps } from '../../../../interfaces/input';

const CheckboxInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, id, className, classNameLabel, onChange } = props;

  return (
    <div className={className}>
      <label className={classNameLabel} htmlFor={id}>
        {label}
      </label>
      <input type="checkbox" id={id} ref={ref} onChange={onChange} />
    </div>
  );
});

export default CheckboxInput;
