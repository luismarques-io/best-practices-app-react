import { TextareaField } from '../../../components/Form';
import { Comment } from '../types';
import { getErrorMessage } from '../../../api/utils';
import { useUpdateComment } from '../hooks/useUpdateComment';

type UpdateCommentFormProps = {
  comment: Comment;
  onCancel: () => void;
  onSuccess: () => void;
};

export const UpdateCommentForm = ({ comment, onCancel, onSuccess }: UpdateCommentFormProps) => {
  const { onSubmitHandler, useFormApi, getValidationClass, mutationState } = useUpdateComment({
    commentId: comment.id,
    defaultValues: { body: comment.body },
    onSuccess,
  });
  const { register } = useFormApi;
  const { isLoading, error } = mutationState;

  return (
    <div className='w-100'>
      <form onSubmit={onSubmitHandler}>
        <TextareaField
          className={`form-control${getValidationClass('body')}`}
          placeholder='Write a comment...'
          label='Write a comment...'
          {...register('body', { required: true })}
          invalidFeedback={'Valid comment is required.'}
          disabled={isLoading}
          style={{ height: '100px' }}
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
