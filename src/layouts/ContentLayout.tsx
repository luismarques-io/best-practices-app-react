import React from 'react';

type ContentLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <div className='container mt-3'>
      {title ? <h1 className='display-5 mb-1'>{title}</h1> : null}
      <div className='mb-5'>{children}</div>
    </div>
  );
};
