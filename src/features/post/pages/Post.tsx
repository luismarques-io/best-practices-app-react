// import { useEffect } from 'react';

import { Params, useParams } from 'react-router-dom';
import { ContentLayout } from '../../../layouts/ContentLayout';
import { Head } from '../../../components/Head/Head';
import { useGetPostQuery } from '../api/postApi';
import { PageSpinner } from '../../../components/Elements/Spinner/PageSpinner';
import { getErrorMessage } from '../../../api/helpers';
import { ErrorPageLayout } from '../../../layouts/ErrorPageLayout';
import { InputField } from '../../../components/Form';
import { Link } from 'react-router-dom';

type QueryParamTypes = Params & {
  postId: string;
};

export const Post = () => {
  const { postId } = useParams<{ postId: string }>() as QueryParamTypes;
  const { data, isLoading, error } = useGetPostQuery({ postId });

  if (error) {
    return <ErrorPageLayout title='Post not found' message={getErrorMessage(error)} />;
  }

  if (isLoading || !data) {
    return <PageSpinner />;
  }

  const userName = data.user?.firstName
    ? `${data.user?.firstName} ${data.user?.lastName}`
    : data.user?.email ?? 'Unknown';

  return (
    <>
      <Head title={data.title} />
      <ContentLayout title={data.title}>
        <p className='mb-4'>
          <span className='me-1'>Author:</span>
          <Link to={`/profile/${data.userId}`}>{userName}</Link>
        </p>
        <p className='mb-4'>{data.body}</p>
        <div className='d-flex d-flex justify-content-between mb-3'>
          <div>
            {data.tags.map((tag) => (
              <span key={tag} className='badge text-bg-secondary me-1'>
                {tag}
              </span>
            ))}
          </div>
          {data.reactions ? (
            <div>
              <span className='badge text-bg-success'>
                {data.reactions} {data.reactions > 1 ? 'likes' : 'like'}
              </span>
            </div>
          ) : null}
        </div>
        <hr />
        <div>
          <div className='row d-flex justify-content-center mt-4'>
            <div className='col-md-10 col-lg-8 col-xl-6'>
              <InputField
                type='textarea'
                className='form-control'
                placeholder='Write a comment...'
                name='comment'
                style={{ height: '100px' }}
                label='Write a comment...'
                invalidFeedback='Valid comment is required.'
                required
              />
              <div className='float-end mt-2'>
                <button className='btn btn-primary py-2' type='submit'>
                  Post comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};
