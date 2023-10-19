import { useId } from 'react';
import { FieldWrapper } from './FieldWrapper';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  value?: string;
  type?: 'text' | 'email' | 'password' | 'url' | 'number' | 'date' | 'time' | 'datetime-local' | 'hidden' | 'textarea';
  id?: string;
  label?: string;
  className?: string;
  invalidFeedback?: string;
};

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, className, invalidFeedback, value, ...restProps } = props;
  const id = props.id ? props.id : useId();

  if (type === 'textarea') {
    return (
      <FieldWrapper labelFor={id} label={label} invalidFeedback={invalidFeedback}>
        <textarea id={id} className={`form-control ${className}`} {...restProps} value={value}></textarea>
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper labelFor={id} label={label} invalidFeedback={invalidFeedback}>
      <input id={id} type={type} className={`form-control ${className}`} value={value} {...restProps} />
    </FieldWrapper>
  );
};
