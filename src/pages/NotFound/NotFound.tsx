import { ErrorPageLayout } from '../../layouts/ErrorPageLayout';

export function NotFound() {
  return (
    <ErrorPageLayout
      headTitle='Page Not Found'
      title='Oops!'
      message='Sorry, the page you are looking for is not available.'
    />
  );
}
