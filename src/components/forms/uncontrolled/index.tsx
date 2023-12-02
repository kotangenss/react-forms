import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  TextInput,
  CheckboxInput,
  RadioInput,
  FileInput,
  AutocompleteInput,
} from '../../inputs/forUncontrolled';
import { setDataValue, setIsUpdated } from '../../../store/dataSliceUncontrolled';
import styles from '../styles.module.scss';
import validation from '../../../utils/validation';
import { Data, FormError } from '../../../interfaces/formData';
import { RootState } from '../../../store';

function prepareFormErrors(errors: Record<keyof Data, { message: string }>): FormError {
  return {
    name: errors.name?.message,
    age: errors.age?.message,
    gender: errors.gender?.message,
    email: errors.email?.message,
    password: errors.password?.message,
    confirmPassword: errors.confirmPassword?.message,
    country: errors.country?.message,
    image: errors.image?.message,
    acceptTerms: errors.acceptTerms?.message,
  };
}

export default function UncontrolledForm(): JSX.Element {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Data>({
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    image: null,
    acceptTerms: false,
  });
  const [formErrors, setFormErrors] = useState<FormError>({
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    image: '',
    acceptTerms: '',
  });
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const maleRef = useRef(null);
  const femaleRef = useRef(null);
  const acceptTermsRef = useRef(null);
  const imageRef = useRef(null);
  const navigate = useNavigate();
  const getDataValueCountries = (state: RootState): string[] => state.dataCountries.value;
  const countryList = useSelector(getDataValueCountries);
  const suggestionSelected = (value: string): void => {
    const field: string = 'country';
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: checked }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const field: string = 'image';
    const { files } = e.target;
    setFormErrors((prevErrors) => ({ ...prevErrors, image: '' }));

    if (files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onloadend = (): void => {
        setFormData((prevData) => ({ ...prevData, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { errors } = await validation<Data>(formData);

    if (Object.keys(errors).length === 0) {
      dispatch(setDataValue(formData));
      dispatch(setIsUpdated(true));
      navigate('/');
    } else {
      const newFormErrors = prepareFormErrors(errors as Record<keyof Data, { message: string }>);
      setFormErrors(newFormErrors);
    }
  };

  return (
    <form className={styles['uncontrolled-form']} onSubmit={handleSubmit} noValidate>
      <div className={styles['input-container']}>
        <TextInput
          label="Name"
          type="text"
          classNameInput={styles['default-input']}
          classNameLabel={styles['default-label']}
          id="name"
          ref={nameRef}
          placeholder="Name"
          onChange={onChangeInput}
        />
        {formErrors.name && <div className={styles.error}>{formErrors.name}</div>}
      </div>
      <div className={styles['input-container']}>
        <TextInput
          label="Age"
          type="number"
          classNameInput={styles['default-input']}
          classNameLabel={styles['default-label']}
          id="age"
          ref={ageRef}
          placeholder="Age"
          onChange={onChangeInput}
        />
        {formErrors.age && <div className={styles.error}>{formErrors.age}</div>}
      </div>
      <div className={`${styles['input-container']} ${styles['gender-container']}`}>
        <p className={styles['default-label']}>Gender</p>
        <div className={styles.gender}>
          <RadioInput
            label="Male"
            id="male"
            name="gender"
            ref={maleRef}
            value="male"
            className={styles['gender-wrapper']}
            onChange={onChangeRadio}
          />
          <RadioInput
            label="Female"
            id="female"
            name="gender"
            ref={femaleRef}
            value="female"
            className={styles['gender-wrapper']}
            onChange={onChangeRadio}
          />
        </div>
        {formErrors.gender && <div className={styles.error}>{formErrors.gender}</div>}
      </div>
      <div className={styles['input-container']}>
        <TextInput
          label="Email"
          type="email"
          classNameInput={styles['default-input']}
          classNameLabel={styles['default-label']}
          id="email"
          ref={emailRef}
          placeholder="Email"
          onChange={onChangeInput}
        />
        {formErrors.email && <div className={styles.error}>{formErrors.email}</div>}
      </div>
      <div className={`${styles['input-container']} ${styles['country-container']}`}>
        <AutocompleteInput
          items={countryList}
          onSuggestionSelected={suggestionSelected}
          label="Country"
          id="country"
          classNameInput={styles['default-input']}
          classNameLabel={styles['default-label']}
          classNameList={styles['search-list']}
          classNameListItem={styles['suggestion-link']}
        />
        {formErrors.country && <div className={styles.error}>{formErrors.country}</div>}
      </div>
      <div className={styles['input-container']}>
        <TextInput
          label="Password"
          type="password"
          classNameInput={styles['default-input']}
          classNameLabel={styles['default-label']}
          id="password"
          ref={passwordRef}
          placeholder="Password"
          onChange={onChangeInput}
        />
        {formErrors.password && <div className={styles.error}>{formErrors.password}</div>}
      </div>
      <div className={styles['input-container']}>
        <TextInput
          label="Confirm Password"
          type="password"
          classNameInput={styles['default-input']}
          classNameLabel={styles['default-label']}
          id="confirmPassword"
          ref={confirmPasswordRef}
          placeholder="Confirm Password"
          onChange={onChangeInput}
        />
        {formErrors.confirmPassword && (
          <div className={styles.error}>{formErrors.confirmPassword}</div>
        )}
      </div>
      <div className={`${styles['input-container']} ${styles['file-container']}`}>
        <FileInput
          label="Upload Image"
          id="image"
          ref={imageRef}
          accept=".png, .jpeg, .jpg, .svg, .gif, .bmp, .webp, .tiff, .tif, .ico, .jp2"
          className={styles['file-loader']}
          onChange={handleImageChange}
        />
        {formErrors.image && <div className={styles.error}>{formErrors.image}</div>}
      </div>
      <div className={`${styles['input-container']} ${styles['accept-container']}`}>
        <CheckboxInput
          label="Accept the terms"
          id="acceptTerms"
          className={styles['accept-controlled']}
          classNameLabel={styles['default-label']}
          ref={acceptTermsRef}
          onChange={onChangeCheckbox}
        />
        {formErrors.acceptTerms && <div className={styles.error}>{formErrors.acceptTerms}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
