import { FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import TextInput from '../../inputs/textInput';
import RadioInput from '../../inputs/radioInput';
import CheckboxInput from '../../inputs/checkboxInput';
import FileInput from '../../inputs/fileInput';
import SelectInput from '../../inputs/selectInput';
import styles from '../styles.module.scss';
import { setDataValue } from '../../../store/dataSliceUncontrolled';

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

  const handleChange = (field: string, value: string | number | boolean | File | null): void => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleImageChange = (field: string, files: FileList | null): void => {
    if (files && files.length > 0) {
      const file = files[0];

      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        if (file.size <= 1048576) {
          const reader = new FileReader();
          reader.onloadend = (): void => {
            setFormData((prevData) => ({ ...prevData, [field]: reader.result }));
          };
          reader.readAsDataURL(file);
        } else {
          console.error('The file size is too large. Maximum size: 1 МБ.');
        }
      } else {
        console.error('Invalid file format. Please select a PNG or JPEG file');
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(setDataValue(formData));
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
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <TextInput
        label="Age"
        type="number"
        classNameInput={styles['default-input']}
        classNameLabel={styles['default-label']}
        id="age"
        ref={ageRef}
        placeholder="Age"
        onChange={(e) => handleChange('age', e.target.value)}
      />
      <div className={styles.gender}>
        <RadioInput
          label="Male"
          id="male"
          name="gender"
          ref={maleRef}
          value="male"
          onChange={() => handleChange('gender', 'male')}
        />
        <RadioInput
          label="Female"
          id="female"
          name="gender"
          ref={femaleRef}
          value="female"
          onChange={() => handleChange('gender', 'female')}
        />
      </div>
      <TextInput
        label="Email"
        type="email"
        classNameInput={styles['default-input']}
        classNameLabel={styles['default-label']}
        id="email"
        ref={emailRef}
        placeholder="Email"
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <TextInput
        label="Password"
        type="password"
        classNameInput={styles['default-input']}
        classNameLabel={styles['default-label']}
        id="password"
        ref={passwordRef}
        placeholder="Password"
        onChange={(e) => handleChange('password', e.target.value)}
      />
      <TextInput
        label="Confirm Password"
        type="password"
        classNameInput={styles['default-input']}
        classNameLabel={styles['default-label']}
        id="confirm-password"
        ref={confirmPasswordRef}
        placeholder="Confirm Password"
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
      />
      <SelectInput
        label="Country"
        id="country"
        placeholder="Select country"
        className={styles.countries}
        ref={countryRef}
        options={countries}
        onChange={(e) => handleChange('country', e.target.value)}
      />
      <FileInput
        label="Upload Image"
        id="image"
        className={styles['file-loader']}
        ref={imageRef}
        accept=".png, .jpeg"
        onChange={(e) => handleImageChange('image', (e.target as HTMLInputElement).files)}
      />

      <CheckboxInput
        label="Accept the terms"
        id="check"
        className={styles.accept}
        ref={acceptTermsRef}
        onChange={(e) => handleChange('check', (e.target as HTMLInputElement).checked)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
