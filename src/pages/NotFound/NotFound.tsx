import { Link } from 'react-router-dom';
import { Head } from '../../components/Head/Head';
import { ContentLayout } from '../../layouts/ContentLayout';

export function NotFound() {
  return (
    <>
      <Head title='Page Not Found' />
      <ContentLayout title='Oops!'>
        <h2 className='lead'>Sorry, the page you are looking for is not available.</h2>
        <Link to='/' className='btn btn-link p-0 mb-2'>
          Go back to home
        </Link>
      </ContentLayout>
    </>
  );
}
