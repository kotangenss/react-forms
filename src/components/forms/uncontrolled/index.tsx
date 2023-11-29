import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import TextInput from '../../inputs/textInput';
import RadioInput from '../../inputs/radioInput';
import CheckboxInput from '../../inputs/checkboxInput';
import FileInput from '../../inputs/fileInput';
import SelectInput from '../../inputs/selectInput';
import styles from '../styles.module.scss';
import { setDataValue } from '../../../store/dataSliceUncontrolled';
import validationScheme from '../../../utils/validationScheme';

export default function UncontrolledForm(): JSX.Element {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
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
  const [formErrors, setFormErrors] = useState({
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
  const countries = ['Country 1', 'Country 2', 'Country 3'];

  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const maleRef = useRef(null);
  const femaleRef = useRef(null);
  const acceptTermsRef = useRef(null);
  const imageRef = useRef(null);
  const countryRef = useRef(null);

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

    try {
      await validationScheme.validate(formData, { abortEarly: false });
      dispatch(setDataValue(formData));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newFormErrors: Record<keyof typeof formData, string> = {
          name: '',
          age: '',
          gender: '',
          email: '',
          password: '',
          confirmPassword: '',
          country: '',
          image: '',
          acceptTerms: '',
        };

        error.inner.forEach((validationError) => {
          if (validationError.path) {
            const fieldName = validationError.path.toString() as keyof typeof formData;
            newFormErrors[fieldName] = validationError.message;
          }
        });

        setFormErrors(newFormErrors);
      }
    }
  };

  return (
    <form className={styles['uncontrolled-form']} onSubmit={handleSubmit} noValidate>
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
      <div className={styles.gender}>
        <RadioInput
          label="Male"
          id="male"
          name="gender"
          ref={maleRef}
          value="male"
          onChange={onChangeRadio}
        />
        <RadioInput
          label="Female"
          id="female"
          name="gender"
          ref={femaleRef}
          value="female"
          onChange={onChangeRadio}
        />
      </div>
      {formErrors.gender && <div className={styles.error}>{formErrors.gender}</div>}
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
      <SelectInput
        label="Country"
        id="country"
        placeholder="Select country"
        className={styles.countries}
        ref={countryRef}
        options={countries}
        onChange={onChangeInput}
      />
      {formErrors.country && <div className={styles.error}>{formErrors.country}</div>}
      <FileInput
        label="Upload Image"
        id="image"
        className={styles['file-loader']}
        ref={imageRef}
        accept=".png, .jpeg, .jpg, .svg, .gif, .bmp, .webp, .tiff, .tif, .ico, .jp2"
        onChange={handleImageChange}
      />
      {formErrors.image && <div className={styles.error}>{formErrors.image}</div>}
      <CheckboxInput
        label="Accept the terms"
        id="check"
        className={styles.accept}
        ref={acceptTermsRef}
        onChange={onChangeCheckbox}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
