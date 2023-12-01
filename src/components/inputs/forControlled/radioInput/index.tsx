import { InputPropsControlled } from '../../../../interfaces/input';

export default function RadioInput(props: InputPropsControlled): JSX.Element {
  const { label, id, name, value, checked, hookData, className, classNameInput } = props;

  return (
    <div className={className}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        {...hookData}
        className={classNameInput}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
