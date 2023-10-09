import { FieldWrapper } from './FieldWrapper';

type InputFieldProps = {
  type?: 'text' | 'email' | 'password' | 'url' | 'number' | 'date' | 'time' | 'datetime-local' | 'hidden';
  id?: string;
  label?: string;
  className?: string;
  invalidFeedback?: string;
  [x: string]: unknown;
};

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', id, label, className, invalidFeedback, ...otherProps } = props;
  return (
    <FieldWrapper labelFor={id} label={label} invalidFeedback={invalidFeedback}>
      <input id={id} type={type} className={`form-control ${className}`} name='email' {...otherProps} />
    </FieldWrapper>
  );
};
