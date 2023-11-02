import * as yup from 'yup';
import { InputField, TextareaField } from '../../../components/Form';
import { PostForEditor } from '../types';
import { useUpdatePostEditor } from '../hooks/usePostEditor';

const schema: yup.ObjectSchema<PostForEditor> = yup.object({
  title: yup.string().required('Valid title is required'),
  body: yup.string().required('Valid article body is required'),
  tags: yup
    .array()
    .transform(function (value, originalValue) {
      if (this.isType(value) && value !== null) {
        return value;
      }
      return originalValue ? originalValue.split(',') : [];
    })
    .required()
    .of(yup.string().required()),
});

type PostEditorProps = {
  onSubmit: (payload: PostForEditor) => void;
  defaultValues?: PostForEditor;
};

export const PostEditor = ({ onSubmit, defaultValues }: PostEditorProps) => {
  const { handleSubmit, register, errors, isSubmitting } = useUpdatePostEditor({ schema, defaultValues, onSubmit });

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        {...register('title')}
        invalidFeedback={errors.title?.message}
        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
        type='text'
        placeholder='Title *'
        label='Title *'
        disabled={isSubmitting}
      />
      <TextareaField
        {...register('body')}
        invalidFeedback={errors.body?.message}
        className={`form-control ${errors.body ? 'is-invalid' : ''}`}
        placeholder='Write your post *'
        label='Write your post *'
        disabled={isSubmitting}
        style={{ height: '200px' }}
      />

      <InputField
        {...register('tags')}
        invalidFeedback={errors.tags?.message}
        className={`form-control ${errors.tags ? 'is-invalid' : ''}`}
        type='text'
        placeholder='Tags (comma separated)'
        label='Tags (comma separated)'
        disabled={isSubmitting}
      />

      <button disabled={isSubmitting} className='btn btn-primary py-2 mt-2' type='submit'>
        Publish Article
      </button>
      {errors.root?.serverError ? (
        <div className='alert alert-danger mt-3'>{errors.root.serverError.message}</div>
      ) : null}
    </form>
  );
};
