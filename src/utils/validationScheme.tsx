import * as yup from 'yup';

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
    .email(
      'Invalid email address. The "@" symbol must be present and at least one period after the "@" symbol must be present.'
    ),
  password: yup
    .string()
    .transform((originalValue) => originalValue.trim())
    .required('Password field is required')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
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
  country: yup.string().required('Country field is required'),
});

export default validationScheme;
