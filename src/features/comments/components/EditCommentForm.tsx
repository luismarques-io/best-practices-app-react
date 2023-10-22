import { useState } from 'react';
import { InputField } from '../../../components/Form';
import { Comment, CommentEditorState } from '../types';
import { getErrorMessage } from '../../../api/utils';
import { useUpdateCommentMutation } from '../api/commentsApi';

type EditCommentFormProps = {
  comment: Comment;
  onCancel: () => void;
  onSuccess: () => void;
};

const initialFormState: CommentEditorState = {
  body: '',
};

export const EditCommentForm = ({ comment, onCancel, onSuccess }: EditCommentFormProps) => {
  const [updateComment, { isLoading, error }] = useUpdateCommentMutation();
  const [wasValidated, setWasValidated] = useState(false);
  const [formState, setFormState] = useState<CommentEditorState>({ body: comment.body });

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setWasValidated(false);
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

    try {
      await updateComment({ id: comment.id, body: formState.body }).unwrap();
      resetForm();
      alert('Saved (not actually, just a demo)');
      onSuccess();
    } catch (err) {
      alert(JSON.stringify(err));
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
          <button className='btn btn-light btn-sm ms-2' type='button' disabled={isLoading} onClick={onCancel}>
            Cancel
          </button>
          <button className='btn btn-primary btn-sm ms-2' type='submit' disabled={isLoading}>
            Save
          </button>
        </div>
        {error ? <div className='text-danger'>{getErrorMessage(error)}</div> : null}
      </form>
    </div>
  );
};
