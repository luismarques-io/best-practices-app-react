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
    <>
      <div className='form-floating mb-2'>
        <input id={id} type={type} className={`form-control ${className}`} name='email' {...otherProps} />
        {label && <label htmlFor={id}>{label}</label>}
        {invalidFeedback && <div className='invalid-feedback'>{invalidFeedback}</div>}
      </div>
    </>
  );
};
