import * as yup from 'yup';
import { TextareaField } from '@/components/Form';
import { Comment, CommentEditorState } from '../types';
import { useUpdateComment } from '../hooks/useUpdateComment';

const schema: yup.ObjectSchema<CommentEditorState> = yup.object({
  body: yup.string().required('Valid comment is required').min(5, 'Should have more than ${min} characters'),
});

type UpdateCommentFormProps = {
  comment: Comment;
  onCancel: () => void;
  onSuccess: () => void;
};

export const UpdateCommentForm = ({ comment, onCancel, onSuccess }: UpdateCommentFormProps) => {
  const { onSubmit, register, errors, isSubmitting } = useUpdateComment({
    commentId: comment.id,
    schema,
    defaultValues: { body: comment.body },
    onSuccess: () => {
      onSuccess();
    },
  });

  return (
    <div className='w-100'>
      <form onSubmit={onSubmit}>
        <TextareaField
          {...register('body')}
          invalidFeedback={errors.body?.message}
          className={`form-control ${errors.body ? 'is-invalid' : ''}`}
          placeholder='Write a comment...'
          label='Write a comment...'
          disabled={isSubmitting}
          style={{ height: '100px' }}
        />
        <div className='text-end mt-2'>
          <button className='btn btn-light btn-sm ms-2' type='button' disabled={isSubmitting} onClick={onCancel}>
            Cancel
          </button>
          <button className='btn btn-primary btn-sm ms-2' type='submit' disabled={isSubmitting}>
            Save
          </button>
        </div>
        {errors.root?.serverError ? (
          <div className='alert alert-danger mt-2'>{errors.root.serverError.message}</div>
        ) : null}
      </form>
    </div>
  );
};
