import { useRef } from 'react';
import TextInput from '../../inputs/textInput';
import RadioInput from '../../inputs/radioInput';
import CheckboxInput from '../../inputs/checkboxInput';
import FileInput from '../../inputs/fileInput';
import SelectInput from '../../inputs/selectInput';
import styles from '../styles.module.scss';

export default function UncontrolledForm(): JSX.Element {
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

  const handleSubmit = (e): void => {
    e.preventDefault();
    console.log('Name:', nameRef);
    console.log('Age:', ageRef);
  };

  return (
    <form className={styles['uncontrolled-form']} onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        type="text"
        classNameInput={styles['default-input']}
        classNameLabel={styles['default-label']}
        id="name"
        ref={nameRef}
        placeholder="Name"
      />
      <TextInput
        label="Age"
        type="number"
        classNameInput={styles['default-input']}
        classNameLabel={styles['default-label']}
        id="age"
        ref={ageRef}
        placeholder="Age"
      />
      <div className={styles.gender}>
        <RadioInput label="Male" id="male" name="gender" ref={maleRef} value="male" />
        <RadioInput label="Female" id="female" name="gender" ref={femaleRef} value="female" />
      </div>
      <TextInput
        label="Email"
        type="text"
        classNameInput={styles['default-input']}
        classNameLabel={styles['default-label']}
        id="email"
        ref={emailRef}
        placeholder="Email"
      />
      <TextInput
        label="Password"
        type="password"
        classNameInput={styles['default-input']}
        classNameLabel={styles['default-label']}
        id="password"
        ref={passwordRef}
        placeholder="Password"
      />
      <TextInput
        label="Confirm Password"
        type="password"
        classNameInput={styles['default-input']}
        classNameLabel={styles['default-label']}
        id="confirm-password"
        ref={confirmPasswordRef}
        placeholder="Confirm Password"
      />
      <SelectInput
        label="Country"
        id="country"
        className={styles.countries}
        ref={countryRef}
        options={['Country 1', 'Country 2', 'Country 3']}
      />
      <FileInput
        label="Upload Image"
        id="image"
        className={styles['file-loader']}
        ref={imageRef}
        accept=".png, .jpeg"
      />

      <CheckboxInput
        label="Accept the terms"
        id="check"
        className={styles.accept}
        ref={acceptTermsRef}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
