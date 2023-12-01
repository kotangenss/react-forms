import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../store';
import { Data } from '../../interfaces/formData';
import styles from './styles.module.scss';
import { setIsUpdated as setIsUpdatedUncontrolledForm } from '../../store/dataSliceUncontrolled';
import { setIsUpdated as setIsUpdatedControlledForm } from '../../store/dataSliceControlled';

export default function Main(): JSX.Element {
  const dispatch = useDispatch();

  const getDataValueUncontrolled = (state: RootState): Data => state.dataUncontrolled.value;
  const dataValueUncontrolled = useSelector(getDataValueUncontrolled);

  const getDataValueControlled = (state: RootState): Data => state.dataControlled.value;
  const dataValueControlled = useSelector(getDataValueControlled);

  const getIsUpdatedUncontrolled = (state: RootState): boolean => state.dataUncontrolled.isUpdated;
  const dataIsUpdateUncontrolled = useSelector(getIsUpdatedUncontrolled);

  const getIsUpdatedControlled = (state: RootState): boolean => state.dataControlled.isUpdated;
  const dataIsUpdateControlled = useSelector(getIsUpdatedControlled);

  const uncontrolledFormClassList = [styles['data-uncontrolled']].concat(
    dataIsUpdateUncontrolled ? [styles.updated] : []
  );
  const controlledFormClassList = [styles['data-controlled']].concat(
    dataIsUpdateControlled ? [styles.updated] : []
  );

  useEffect(() => {
    setTimeout(() => {
      if (dataIsUpdateUncontrolled) {
        dispatch(setIsUpdatedUncontrolledForm(false));
      }
      if (dataIsUpdateControlled) {
        dispatch(setIsUpdatedControlledForm(false));
      }
    }, 3000);
  }, [dataIsUpdateUncontrolled, dataIsUpdateControlled, dispatch]);

  return (
    <div className={styles.forms}>
      <div className={uncontrolledFormClassList.join(' ')}>
        <h2>Data from uncontrolled form</h2>
        <p>
          Name: <span>{dataValueUncontrolled.name}</span>
        </p>
        <p>
          Age: <span>{dataValueUncontrolled.age}</span>
        </p>
        <p>
          Gender: <span>{dataValueUncontrolled.gender}</span>
        </p>
        <p>
          Email: <span>{dataValueUncontrolled.email}</span>
        </p>
        <p>
          Password: <span>{dataValueUncontrolled.password}</span>
        </p>
        <p>
          Country: <span>{dataValueUncontrolled.country}</span>
        </p>
        <p>
          Terms and conditions:{' '}
          <span>{dataValueUncontrolled.acceptTerms === undefined ? '' : 'Accepted'}</span>
        </p>
        <p>Image:</p>
        {dataValueUncontrolled.image && (
          <img src={dataValueUncontrolled.image} alt="User's uploaded profile file" />
        )}
      </div>
      <div className={controlledFormClassList.join(' ')}>
        <h2>Data from controlled form</h2>
        <p>
          Name: <span>{dataValueControlled.name}</span>
        </p>
        <p>
          Age: <span>{dataValueControlled.age}</span>
        </p>
        <p>
          Gender: <span>{dataValueControlled.gender}</span>
        </p>
        <p>
          Email: <span>{dataValueControlled.email}</span>
        </p>
        <p>
          Password: <span>{dataValueControlled.password}</span>
        </p>
        <p>
          Country: <span>{dataValueControlled.country}</span>
        </p>
        <p>
          Terms and conditions:{' '}
          <span>{dataValueControlled.acceptTerms === undefined ? '' : 'Accepted'}</span>
        </p>
        <p>Image:</p>
        {dataValueControlled.image && (
          <img src={dataValueControlled.image} alt="User's uploaded profile file" />
        )}
      </div>
    </div>
  );
}
