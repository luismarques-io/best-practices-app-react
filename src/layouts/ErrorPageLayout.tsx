import { Link } from 'react-router-dom';
import { Head } from '../components/Head/Head';
import { ContentLayout } from './ContentLayout';
import React from 'react';

type ErrorPageLayoutProps = {
  children?: React.ReactNode;
  headTitle?: string;
  title: string;
  message: string;
  button?: React.ReactNode;
};

export const ErrorPageLayout = ({ children, headTitle, title, message, button }: ErrorPageLayoutProps) => {
  return (
    <>
      <Head title={headTitle ?? title} />
      <ContentLayout title={title}>
        <h2 className='lead'>{message}</h2>
        {children}
        {button ? (
          button
        ) : (
          <Link to='/' className='btn btn-link p-0 mb-2 mt-3'>
            Go back to home
          </Link>
        )}
      </ContentLayout>
    </>
  );
};
