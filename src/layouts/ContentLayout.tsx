import React from 'react';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <div className='container mt-5 mb-2'>
        <h1 className='display-4'>{title}</h1>
      </div>
      <div className='container mb-5'>{children}</div>
    </>
  );
};
