import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataControlled } from '../../../interfaces/formData';
import { setDataValue } from '../../../store/dataSliceControlled';
import {
  TextInput,
  CheckboxInput,
  RadioInput,
  FileInput,
  AutocompleteInput,
} from '../../inputs/forControlled';
import validateName from '../../../utils/validate/name';
import validateAge from '../../../utils/validate/age';
import validateEmail from '../../../utils/validate/email';
import validatePassword from '../../../utils/validate/password';
import сonfirmPassword from '../../../utils/validate/confirmPassword';
import acceptTerms from '../../../utils/validate/acceptTerms';
import validateFile from '../../../utils/validate/file';
import validateGender from '../../../utils/validate/gender';
import countryList from '../../../utils/countries';
import validateAutocomplete from '../../../utils/validate/autocomplete';
import styles from '../styles.module.scss';

export default function ControlledForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    trigger,
    setValue,
  } = useForm<DataControlled>({
    defaultValues: {},
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<DataControlled> = (data): void => {
    const file = data.image[0];
    const reader = new FileReader();
    reader.onloadend = (): void => {
      const updData = { ...data, image: reader.result };
      dispatch(setDataValue(updData));
    };
    reader.readAsDataURL(file);
    navigate('/');
  };

  const name = watch('name');
  const age = watch('age');
  const gender = watch('gender');
  const email = watch('email');
  const country = watch('country');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const image = watch('image');
  const acceptTerm = watch('acceptTerms');

  useEffect(() => {
    if (name && dirtyFields?.name) {
      trigger('name');
    }

    if (age && dirtyFields?.age) {
      trigger('age');
    }

    if (gender && dirtyFields?.gender) {
      trigger('gender');
    }

    if (email && dirtyFields?.email) {
      trigger('email');
    }

    if (country && dirtyFields?.country) {
      trigger('country');
    }

    if (password && dirtyFields?.password) {
      trigger('password');
    }

    if (confirmPassword && dirtyFields?.confirmPassword) {
      trigger('confirmPassword');
    }

    if (image && dirtyFields?.image) {
      trigger('image');
    }

    if (acceptTerm && dirtyFields?.acceptTerms) {
      trigger('acceptTerms');
    }
  }, [
    acceptTerm,
    age,
    confirmPassword,
    country,
    dirtyFields?.acceptTerms,
    dirtyFields?.age,
    dirtyFields?.confirmPassword,
    dirtyFields?.country,
    dirtyFields?.email,
    dirtyFields?.gender,
    dirtyFields?.image,
    dirtyFields?.name,
    dirtyFields?.password,
    email,
    gender,
    image,
    name,
    password,
    trigger,
  ]);

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
          hookData={register('name', {
            required: 'The field is required',
            validate: validateName,
          })}
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
          hookData={register('age', {
            required: 'The field is required',
            validate: validateAge,
          })}
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
            hookData={register('gender', {
              required: 'The field is required',
              validate: validateGender,
            })}
          />
          <RadioInput
            label="Female"
            id="female"
            name="gender"
            value="female"
            className={styles['gender-wrapper']}
            classNameInput={styles['default-input']}
            hookData={register('gender', {
              required: 'The field is required',
              validate: validateGender,
            })}
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
          hookData={register('email', {
            required: 'The field is required',
            validate: validateEmail,
          })}
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
          hookData={register('country', {
            required: 'The field is required',
            validate: validateAutocomplete,
          })}
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
          hookData={register('password', {
            required: 'The field is required',
            validate: validatePassword,
          })}
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
          hookData={register('confirmPassword', {
            required: 'The field is required',
            validate: (value) => сonfirmPassword(value, watch('password')),
          })}
          errorMessage={errors && errors.confirmPassword && errors.confirmPassword?.message}
        />
      </div>
      <div className={`${styles['input-container']} ${styles['file-container']}`}>
        <FileInput
          label="Upload Image"
          id="image"
          className={styles['file-loader']}
          classNameLabel={styles['default-label']}
          hookData={register('image', {
            required: 'The field is required',
            validate: validateFile,
          })}
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
          hookData={register('acceptTerms', {
            required: 'The field is required',
            validate: acceptTerms,
          })}
          errorMessage={errors && errors.acceptTerms && errors.acceptTerms?.message}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
