import { InputPropsControlled } from '../../../../interfaces/input';
import styles from '../../../forms/styles.module.scss';

export default function TextInput(props: InputPropsControlled): JSX.Element {
  const { label, type, id, placeholder, hookData, errorMessage, classNameInput, classNameLabel } =
    props;

  return (
    <div>
      <div>
        <label className={classNameLabel} htmlFor={id}>
          {label}
        </label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...hookData}
          className={classNameInput}
        />
      </div>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
}
