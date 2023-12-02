import { SubmitHandler, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataControlled } from '../../../interfaces/formData';
import { setData } from '../../../store/dataSliceForms';
import {
  TextInput,
  CheckboxInput,
  RadioInput,
  FileInput,
  AutocompleteInput,
} from '../../inputs/forControlled';
import styles from '../styles.module.scss';
import validation from '../../../utils/validation';
import { ValidationResult } from '../../../interfaces/validation';
import { RootState } from '../../../store';

const useYupValidationResolver = (): ((data: DataControlled) => ValidationResult) =>
  useCallback(async (data: DataControlled) => validation<DataControlled>(data), []);

export default function ControlledForm(): JSX.Element {
  const resolver = useYupValidationResolver();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
  } = useForm<DataControlled>({
    defaultValues: {},
    resolver,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getDataValueCountries = (state: RootState): string[] => state.dataCountries.value;
  const countryList = useSelector(getDataValueCountries);

  const onSubmit: SubmitHandler<DataControlled> = (data): void => {
    const file = data.image[0];
    const reader = new FileReader();
    reader.onloadend = (): void => {
      const updData = { ...data, image: reader.result };
      dispatch(setData({ name: 'controlled form', fields: updData }));
    };
    reader.readAsDataURL(file);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['input-container']}>
        <TextInput
          label="Name"
          type="text"
          id="name"
          placeholder="Name"
          classNameLabel={styles['default-label']}
          classNameInput={styles['default-input']}
          hookData={register('name')}
          errorMessage={errors && errors.name && errors.name?.message}
        />
      </div>
      <div className={styles['input-container']}>
        <TextInput
          label="Age"
          type="number"
          id="age"
          placeholder="Age"
          classNameLabel={styles['default-label']}
          classNameInput={styles['default-input']}
          hookData={register('age')}
          errorMessage={errors && errors.age && errors.age?.message}
        />
      </div>
      <div className={`${styles['input-container']} ${styles['gender-container']}`}>
        <p className={`${styles['default-label']} ${styles['gender-label']}`}>Gender</p>
        <div className={styles.gender}>
          <RadioInput
            label="Male"
            id="male"
            name="gender"
            value="male"
            className={styles['gender-wrapper']}
            classNameInput={styles['default-input']}
            hookData={register('gender')}
          />
          <RadioInput
            label="Female"
            id="female"
            name="gender"
            value="female"
            className={styles['gender-wrapper']}
            classNameInput={styles['default-input']}
            hookData={register('gender')}
          />
          {errors && errors.gender && errors.gender?.message && (
            <div className={styles.error}>{errors.gender?.message}</div>
          )}
        </div>
      </div>
      <div className={styles['input-container']}>
        <TextInput
          label="Email"
          type="email"
          id="email"
          placeholder="Email"
          classNameLabel={styles['default-label']}
          classNameInput={styles['default-input']}
          hookData={register('email')}
          errorMessage={errors && errors.email && errors.email?.message}
        />
      </div>
      <div className={`${styles['input-container']} ${styles['country-container']}`}>
        <AutocompleteInput
          label="Country"
          id="country"
          items={countryList}
          classNameInput={styles['default-input']}
          classNameLabel={styles['default-label']}
          classNameList={styles['search-list']}
          classNameListItem={styles['suggestion-link']}
          hookData={register('country')}
          errorMessage={errors && errors.country && errors.country?.message}
          setValue={setValue}
        />
      </div>
      <div className={styles['input-container']}>
        <TextInput
          label="Password"
          type="password"
          id="password"
          placeholder="Password"
          classNameLabel={styles['default-label']}
          classNameInput={styles['default-input']}
          hookData={register('password')}
          errorMessage={errors && errors.password && errors.password?.message}
        />
      </div>
      <div className={styles['input-container']}>
        <TextInput
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          classNameLabel={styles['default-label']}
          classNameInput={styles['default-input']}
          hookData={register('confirmPassword')}
          errorMessage={errors && errors.confirmPassword && errors.confirmPassword?.message}
        />
      </div>
      <div className={`${styles['input-container']} ${styles['file-container']}`}>
        <FileInput
          label="Upload Image"
          id="image"
          className={styles['file-loader']}
          classNameLabel={styles['default-label']}
          hookData={register('image')}
          errorMessage={errors && errors.image && errors.image?.message}
        />
      </div>
      <div className={`${styles['input-container']} ${styles['accept-container']}`}>
        <CheckboxInput
          label="Accept the terms"
          id="acceptTerms"
          className={styles['accept-controlled']}
          classNameLabel={styles['default-label']}
          classNameInput={styles.accept}
          hookData={register('acceptTerms')}
          errorMessage={errors && errors.acceptTerms && errors.acceptTerms?.message}
        />
      </div>
      <button
        type="submit"
        disabled={Object.keys(errors).length !== 0 || Object.keys(dirtyFields).length !== 9}
      >
        Submit
      </button>
    </form>
  );
}
