import * as yup from 'yup';
import { TextareaField } from '@/components/Form';
import { useAuth } from '@/features/auth';
import { useCreateComment } from '../hooks/useCreateComponent';
import { CommentEditorState } from '../types';

const schema: yup.ObjectSchema<CommentEditorState> = yup.object({
  body: yup.string().required('Valid comment is required').min(5, 'Should have more than ${min} characters'),
});

type CreateCommentProps = {
  postId: string;
};

export const CreateComment = ({ postId }: CreateCommentProps) => {
  const { user, userId = '' } = useAuth();
  const { onSubmit, register, errors, isSubmitting, isSuccess } = useCreateComment({ postId, userId, schema });

  return (
    <>
      {user ? (
        <form onSubmit={onSubmit}>
          <div className='d-flex flex-start w-100'>
            <img className='rounded-circle me-3' src={user.image} width='50' height='50' />
            <div className='w-100'>
              <h5 className='mb-0'>{`${user.firstName} ${user.lastName}`}</h5>
              <p className='text-muted'>{`${user.username}`}</p>
              <TextareaField
                {...register('body')}
                invalidFeedback={errors.body?.message}
                className={`form-control ${errors.body ? 'is-invalid' : ''}`}
                placeholder='Write a comment...'
                label='Write a comment...'
                disabled={isSubmitting}
                style={{ height: '100px' }}
              />
              <div className='float-end mt-2'>
                <button className='btn btn-primary py-2' type='submit' disabled={isSubmitting}>
                  Post comment
                </button>
              </div>
            </div>
          </div>
          {errors.root?.serverError ? (
            <div className='alert alert-danger mt-2'>{errors.root.serverError.message}</div>
          ) : null}
          {isSuccess ? (
            <div className='alert alert-success mt-2'>Comment added successfully! (not actually, just a demo)</div>
          ) : null}
        </form>
      ) : null}
    </>
  );
};
