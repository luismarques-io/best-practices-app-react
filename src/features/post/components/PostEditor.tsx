import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { InputField, TextareaField } from '../../../components/Form';
import { PostEditorState } from '../types/postEditor';
import { selectEditorPost, updateField, selectIsLoading } from '../stores/postEditorSlice';

type PostEditorProps = {
  onSubmit: (ev: React.FormEvent) => void;
};

export const PostEditor = ({ onSubmit }: PostEditorProps) => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(selectEditorPost);
  const isLoading = useAppSelector(selectIsLoading);
  const [wasValidated, setWasValidated] = useState(false);

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(updateField({ name: name as keyof PostEditorState['post'], value }));
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

    onSubmit(event);
  };

  return (
    <form className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
      <InputField
        disabled={isLoading}
        type='text'
        className='form-control'
        placeholder='Title *'
        name='title'
        onChange={handleChange}
        value={formState.title || ''}
        label='Title *'
        invalidFeedback='Title has to be valid.'
        required
      />
      <TextareaField
        disabled={isLoading}
        className='form-control'
        placeholder='Write your post *'
        name='body'
        onChange={handleChange}
        value={formState.body || ''}
        style={{ height: '200px' }}
        label='Write your post *'
        invalidFeedback='Valid article body is required.'
        required
      />

      <InputField
        disabled={isLoading}
        type='text'
        className='form-control'
        placeholder='Tags (comma separated)'
        name='tags'
        onChange={handleChange}
        value={formState.tags.toString() || ''}
        label='Tags (comma separated)'
        invalidFeedback='Tags has to be valid.'
      />

      <button disabled={isLoading} className='btn btn-primary py-2 mt-2' type='submit'>
        Publish Article
      </button>
    </form>
  );
};
