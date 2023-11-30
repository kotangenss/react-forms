import * as yup from 'yup';
import countryList from './countries';

const validationScheme = yup.object().shape({
  name: yup
    .string()
    .required('Name field is required')
    .matches(/^[A-ZА-Я]/, 'The name must begin with a capital letter'),
  age: yup
    .number()
    .transform((originalValue, originalObject) => {
      const value = originalObject.age !== '' ? originalValue : undefined;
      return Number.isNaN(value) ? undefined : value;
    })
    .required('Age field is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  gender: yup.string().required('Gender field is required'),
  email: yup
    .string()
    .required('Email field is required')
    .email('Please include "@" and at least one period after "@"'),
  password: yup
    .string()
    .transform((originalValue) => originalValue.trim())
    .required('Password field is required')
    .matches(/\d/, 'Insecure password: must contain at least one digit')
    .matches(/[a-z]/, 'Insecure password: must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Insecure password: must contain at least one uppercase letter')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Insecure password: must contain at least one special character'
    ),
  confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match'),
  image: yup
    .mixed()
    .required('Image is required')
    .test('fileSize', 'File size is too large. Maximum size: 1MB', (value) => {
      const file = (value as string).split(',')[1];
      const binaryString = atob(file);
      const fileSizeInBytes = binaryString.length;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

      return fileSizeInMB <= 1;
    })
    .test('fileType', 'Invalid file format. Only PNG and JPEG are allowed', (value) => {
      const file = value as string;
      return file.includes('image/png') || file.includes('image/jpeg');
    }),
  country: yup
    .string()
    .required('Country field is required')
    .oneOf(countryList, 'Please select from the provided list'),
  acceptTerms: yup.boolean().oneOf([true], 'You must accept the Terms and Conditions'),
});

export default validationScheme;
