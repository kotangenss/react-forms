import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Data } from '../../interfaces/formData';
import styles from './styles.module.scss';

export default function Main(): JSX.Element {
  const getDataValue = (state: RootState): Data => state.data.value;
  const dataValueUncontrolled = useSelector(getDataValue);
  const { name, age, gender, email, password, country, image, acceptTerms } = dataValueUncontrolled;
  let termsStatus;

  if (acceptTerms === undefined) {
    termsStatus = '';
  } else {
    termsStatus = acceptTerms ? 'Accepted' : 'Not accepted';
  }

  return (
    <div className={styles['data-uncontrolled']}>
      <h2>Data from uncontrolled form</h2>
      <p>
        Name: <span>{name}</span>
      </p>
      <p>
        Age: <span>{age}</span>
      </p>
      <p>
        Gender: <span>{gender}</span>
      </p>
      <p>
        Email: <span>{email}</span>
      </p>
      <p>
        Password: <span>{password}</span>
      </p>
      <p>
        Country: <span>{country}</span>
      </p>
      <p>
        Terms and conditions: <span>{termsStatus}</span>
      </p>
      <p>Image:</p>
      {image && <img src={image} alt="User's uploaded profile file" />}
    </div>
  );
}
