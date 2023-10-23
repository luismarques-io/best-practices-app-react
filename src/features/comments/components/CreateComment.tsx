import { TextareaField } from '../../../components/Form';
import { useAuth } from '../../auth';
import { useCreateComment } from '../hooks/useCreateComponent';

type CreateCommentProps = {
  postId: string;
};

export const CreateComment = ({ postId }: CreateCommentProps) => {
  const { user } = useAuth();
  const onSuccess = () => alert('Comment added successfully! (not actually, just a demo)');
  const { onSubmitHandler, useFormApi } = useCreateComment({ postId, userId: user?.id ?? '', onSuccess });
  const { register, formState } = useFormApi;
  const { errors, isSubmitting } = formState;

  return (
    <>
      {user ? (
        <form onSubmit={onSubmitHandler}>
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
                className={`form-control${errors.body ? ' is-invalid' : null}`}
                placeholder='Write a comment...'
                label='Write a comment...'
                {...(errors.body?.type === 'required' && { invalidFeedback: 'Valid comment is required' })}
                {...(errors.body?.type === 'minLength' && { invalidFeedback: 'Should have more than 5 characters' })}
                {...register('body', { required: true, minLength: 5 })}
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

          {errors.root?.serverError && <div className='text-danger'>{errors.root.serverError.message}</div>}
        </form>
      ) : null}
    </>
  );
};
