import { useForm as useReactHookForm, FieldErrors } from 'react-hook-form';
import { useCallback } from 'react';

export const useForm = useReactHookForm;

type FormState = {
  errors: FieldErrors;
  isSubmitted: boolean;
  isDirty: boolean;
};

/**
 * A custom hook to determine the validation class for a form field.
 * @param {FormState} formState - The form state object.
 * @returns {Function} - A function to get the validation class for a field.
 */
export const useValidationClass = ({ errors, isSubmitted, isDirty }: FormState) => {
  const VALID_CLASSNAME = ' is-valid';
  const INVALID_CLASSNAME = ' is-invalid';

  const getValidationClassName = useCallback(
    (fieldName: string) => {
      const hasFieldErrors = errors?.[fieldName];
      const isValid = isSubmitted && !hasFieldErrors;

      // eslint-disable-next-line no-console
      console.log({ errors, isSubmitted, isDirty, hasFieldErrors, isValid });

      return hasFieldErrors ? INVALID_CLASSNAME : isValid && isDirty ? VALID_CLASSNAME : '';
    },
    [errors, isSubmitted, isDirty]
  );

  return getValidationClassName;
};
