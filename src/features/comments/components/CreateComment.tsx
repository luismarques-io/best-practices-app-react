import { useState } from 'react';
import { TextareaField } from '../../../components/Form';
import { useAuth } from '../../auth';
import { CommentEditorState } from '../types';
import { useCreateCommentMutation } from '../api/commentsApi';

type CreateCommentProps = {
  postId: string;
};

const initialFormState: CommentEditorState = {
  body: '',
};

export const CreateComment = ({ postId }: CreateCommentProps) => {
  const { user } = useAuth();
  const [wasValidated, setWasValidated] = useState(false);
  const [formState, setFormState] = useState<CommentEditorState>(initialFormState);
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = (form: HTMLFormElement) => {
    setWasValidated(true);
    return form.checkValidity();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid(event.currentTarget) || !user) {
      return;
    }

    try {
      await createComment({ postId, userId: user.id, ...formState }).unwrap();
      setFormState(initialFormState);
      setWasValidated(false);
      alert('Comment added successfully (not actually created, just a demo)');
      // TODO: Implement a backend that can actually creates comments
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  return (
    <>
      {user ? (
        <form className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
          <div className='d-flex flex-start w-100'>
            <img
              className='rounded-circle me-3'
              src={user.image ? user.image : `https://image.dummyjson.com/300x300/008080/ffffff?text=${user.firstName}`}
              width='50'
              height='50'
            />
            <div className='w-100'>
              <h5 className='mb-0'>{`${user.firstName} ${user.lastName}`}</h5>
              <p className='text-muted'>{`${user.username}`}</p>
              <TextareaField
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
                <button className='btn btn-primary py-2' type='submit' disabled={isLoading}>
                  Post comment
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
};
