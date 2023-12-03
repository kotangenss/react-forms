import { InputPropsControlled } from '../../../../interfaces/input';
import styles from '../../../forms/styles.module.scss';

export default function CheckboxInput(props: InputPropsControlled): JSX.Element {
  const { label, id, hookData, errorMessage, className, classNameInput, classNameLabel } = props;

  return (
    <div>
      <div className={className}>
        <label className={classNameLabel} htmlFor={id}>
          {label}
        </label>
        <input type="checkbox" id={id} {...hookData} className={classNameInput} />
      </div>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
}
