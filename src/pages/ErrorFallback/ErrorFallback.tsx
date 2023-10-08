import { ContentLayout } from '../../layouts/ContentLayout';

export function ErrorFallback() {
  return (
    <>
      <ContentLayout title='Oops!'>
        <h2 className='lead'>Something went wrong.</h2>
        <button className='btn btn-link p-0 mb-2' onClick={() => window.location.assign(window.location.origin)}>
          Refresh
        </button>
      </ContentLayout>
    </>
  );
}
