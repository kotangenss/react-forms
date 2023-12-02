import * as yup from 'yup';
import countryList from './countries';

const validationScheme = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-ZА-Я]/, 'The name must begin with a capital letter')
    .required('Name field is required'),
  age: yup
    .number()
    .transform((originalValue, originalObject) => {
      const value = originalObject.age !== '' ? originalValue : undefined;
      return Number.isNaN(value) ? undefined : value;
    })
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age field is required'),
  gender: yup.string().required('Gender field is required'),
  email: yup
    .string()
    .required('Email field is required')
    .matches(
      /@([-A-Za-z0-9]+\.){1,2}[-A-Za-z0-9]{2,}$/,
      'Enter a valid domain for the email address, e.g.user@example.com'
    ),
  password: yup
    .string()
    .transform((originalValue) => originalValue.trim())
    .matches(/\d/, 'Insecure password: must contain at least one digit')
    .matches(/[a-z]/, 'Insecure password: must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Insecure password: must contain at least one uppercase letter')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Insecure password: must contain at least one special character'
    )
    .required('Password field is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match'),
  image: yup
    .mixed()
    .required('Image is required')
    .test('fileRequired', 'Image is required', (value) => {
      if (value instanceof FileList) {
        return (value as FileList).length === 1;
      }

      return value !== undefined;
    })
    .test('fileSize', 'File size is too large. Maximum size: 1MB', (value) => {
      if (value instanceof FileList) {
        if (value.length !== 1) return true;

        const fileSizeInMB = value[0].size / (1024 * 1024);

        return fileSizeInMB <= 1;
      }

      const file = (value as string).split(',')[1];
      const binaryString = atob(file);
      const fileSizeInBytes = binaryString.length;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

      return fileSizeInMB <= 1;
    })
    .test('fileType', 'Invalid file format. Only PNG and JPEG are allowed', (value) => {
      if (value instanceof FileList) {
        if (value.length !== 1) return true;

        return value[0].type === 'image/png' || value[0].type === 'image/jpeg';
      }

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
