import { useState } from 'react';
import { InputField } from '../../../components/Form';
import { Comment, CommentEditorState } from '../types';
import { getErrorMessage } from '../../../api/utils';

type EditCommentFormProps = {
  comment: Comment;
  onCancel: () => void;
  onSubmit: (formState: CommentEditorState) => void;
};

const initialFormState: CommentEditorState = {
  body: '',
};

const initialErrorState: string | undefined = undefined;

export const EditCommentForm = ({ comment, onCancel, onSubmit }: EditCommentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [wasValidated, setWasValidated] = useState(false);
  const [formState, setFormState] = useState<CommentEditorState>({ body: comment.body });
  const [error, setError] = useState<string | undefined>(initialErrorState);

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setError(initialErrorState);
    setWasValidated(false);
    setIsLoading(false);
  };

  const isFormValid = (form: HTMLFormElement) => {
    setWasValidated(true);
    return form.checkValidity();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid(event.currentTarget)) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formState);
      resetForm();
    } catch (err) {
      setError(getErrorMessage(err));
      setIsLoading(false);
    }
  };

  return (
    <div className='w-100'>
      <form className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
        <InputField
          type='textarea'
          className='form-control'
          placeholder='Write a comment...'
          name='body'
          style={{ height: '100px' }}
          label='Write a comment...'
          invalidFeedback='Valid comment is required.'
          required
          value={formState.body || ''}
          onChange={handleChange}
          disabled={isLoading}
        />
        <div className='float-end mt-2'>
          <button className='btn btn-light btn-sm ms-2' type='submit' disabled={isLoading} onClick={onCancel}>
            Cancel
          </button>
          <button className='btn btn-primary btn-sm ms-2' type='submit' disabled={isLoading}>
            Save
          </button>
        </div>
        {error ? <div className='text-danger'>{error}</div> : null}
      </form>
    </div>
  );
};
