import React from 'react';

type ContentLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <div className='container mt-3'>
        <h1 className='display-5 mb-1'>{title}</h1>
        <div className='mb-5'>{children}</div>
      </div>
    </>
  );
};
