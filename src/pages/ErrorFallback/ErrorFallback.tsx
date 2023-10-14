import { ErrorPageLayout } from '../../layouts/ErrorPageLayout';

export function ErrorFallback() {
  return (
    <ErrorPageLayout
      title='Oops!'
      message='Something went wrong.'
      button={
        <button className='btn btn-link p-0 mb-2' onClick={() => window.location.assign(window.location.origin)}>
          Refresh
        </button>
      }
    />
  );
}
