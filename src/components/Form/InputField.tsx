import { useId } from 'react';
import { FieldWrapper } from './FieldWrapper';

type InputFieldProps = {
  value?: string;
  type?: 'text' | 'email' | 'password' | 'url' | 'number' | 'date' | 'time' | 'datetime-local' | 'hidden' | 'textarea';
  id?: string;
  label?: string;
  className?: string;
  invalidFeedback?: string;
  [x: string]: unknown;
};

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, className, invalidFeedback, value, ...otherProps } = props;
  const uniqueId = useId();
  const id = props.id ? props.id : uniqueId;

  if (type === 'textarea') {
    return (
      <FieldWrapper labelFor={id} label={label} invalidFeedback={invalidFeedback}>
        <textarea id={id} className={`form-control ${className}`} {...otherProps} value={value}></textarea>
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper labelFor={id} label={label} invalidFeedback={invalidFeedback}>
      <input id={id} type={type} className={`form-control ${className}`} value={value} {...otherProps} />
    </FieldWrapper>
  );
};
