import * as React from 'react';

type FieldWrapperProps = {
  children: React.ReactNode;
  labelFor?: string;
  label?: string;
  invalidFeedback?: string;
};

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { children, labelFor, label, invalidFeedback } = props;
  return (
    <div className='form-floating mb-2'>
      {children}
      {label && <label htmlFor={labelFor}>{label}</label>}
      {invalidFeedback && <div className='invalid-feedback'>{invalidFeedback}</div>}
    </div>
  );
};
