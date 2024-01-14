import { forwardRef, useId } from 'react';
import { FieldWrapper } from './FieldWrapper';

export type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
  type?: 'text' | 'email' | 'password' | 'url' | 'number' | 'date' | 'time' | 'datetime-local' | 'hidden';
  id?: string;
  label?: string;
  className?: string;
  invalidFeedback?: string;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props: InputFieldProps, ref) => {
  const { type = 'text', label, className, invalidFeedback, value, ...restProps } = props;
  const uniqueId = useId();
  const id = props.id ? props.id : uniqueId;

  return (
    <FieldWrapper labelFor={id} label={label} invalidFeedback={invalidFeedback}>
      <input ref={ref} id={id} type={type} className={`form-control ${className ?? ''}`} value={value} {...restProps} />
    </FieldWrapper>
  );
});
