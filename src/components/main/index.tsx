import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './styles.module.scss';
import { setIsUpdated } from '../../store/dataSliceForms';
import { getForms, getIsUpdated } from '../../store/selectors/forms';

export default function Main(): JSX.Element {
  const dispatch = useDispatch();
  const formList = useSelector(getForms);
  const isUpdated = useSelector(getIsUpdated);

  const getClasses = (updated: boolean): string => {
    return [styles.form].concat(updated ? [styles.updated] : []).join(' ');
  };

  useEffect(() => {
    setTimeout(() => {
      if (isUpdated) {
        dispatch(setIsUpdated());
      }
    }, 3000);
  }, [isUpdated, dispatch]);

  return (
    <div className={styles.forms}>
      {[...formList].reverse().map(({ name, fields }, index) => {
        return (
          <div className={getClasses(isUpdated && index === 0)} key={`${name}-${index}`}>
            <h2>Data from {name}</h2>
            <p>
              Name: <span>{fields.name}</span>
            </p>
            <p>
              Age: <span>{fields.age}</span>
            </p>
            <p>
              Gender: <span>{fields.gender}</span>
            </p>
            <p>
              Email: <span>{fields.email}</span>
            </p>
            <p>
              Password: <span>{fields.password}</span>
            </p>
            <p>
              Confirm password: <span>{fields.confirmPassword}</span>
            </p>
            <p>
              Country: <span>{fields.country}</span>
            </p>
            <p>
              Terms and conditions:{' '}
              <span>{fields.acceptTerms === undefined ? '' : 'Accepted'}</span>
            </p>
            <p>Image:</p>
            {fields.image && <img src={fields.image} alt="User's uploaded profile file" />}
          </div>
        );
      })}
    </div>
  );
}
