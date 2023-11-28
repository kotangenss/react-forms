import React from 'react';
import { InputProps } from '../../interfaces/input';

const FileInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, id, className, accept } = props;

  return (
    <div className={className}>
      <label htmlFor={id}>{label}:</label>
      <input type="file" id={id} ref={ref} accept={accept} />
    </div>
  );
});

export default FileInput;
