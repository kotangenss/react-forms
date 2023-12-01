import { InputPropsControlled } from '../../../../interfaces/input';
import styles from '../../../forms/styles.module.scss';

export default function FileInput(props: InputPropsControlled): JSX.Element {
  const { label, id, accept, hookData, errorMessage, className, classNameLabel } = props;

  return (
    <div className={className}>
      <label className={classNameLabel} htmlFor={id}>
        {label}:
      </label>
      <input type="file" id={id} accept={accept} {...hookData} />
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
}
