import { forwardRef, useId } from 'react';
import { FieldWrapper } from './FieldWrapper';

type TextareaFieldProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  value?: string;
  id?: string;
  label?: string;
  className?: string;
  invalidFeedback?: string;
};

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>((props: TextareaFieldProps, ref) => {
  const { label, className, invalidFeedback, value, ...restProps } = props;
  const uniqueId = useId();
  const id = props.id ? props.id : uniqueId;

  return (
    <FieldWrapper labelFor={id} label={label} invalidFeedback={invalidFeedback}>
      <textarea ref={ref} id={id} className={`form-control ${className ?? ''}`} {...restProps} value={value}></textarea>
    </FieldWrapper>
  );
});
