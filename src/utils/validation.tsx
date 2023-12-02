import { ValidationError } from 'yup';
import validationScheme from './validationScheme';
import { ValidationResult } from '../interfaces/validation';

export default async function validation<T>(data: T): ValidationResult {
  try {
    const values = await validationScheme.validate(data, {
      abortEarly: false,
    });

    return {
      values,
      errors: {},
    };
  } catch (errors) {
    if (!(errors instanceof ValidationError)) return { values: {}, errors: {} };

    return {
      values: {},
      errors: errors.inner.reduce((allErrors, currentError) => {
        const fieldName = currentError.path;

        if (fieldName) {
          return {
            ...allErrors,
            [fieldName]: {
              type: currentError.type ?? 'validation',
              message: currentError.message,
            },
          };
        }
        return allErrors;
      }, {}),
    };
  }
}
