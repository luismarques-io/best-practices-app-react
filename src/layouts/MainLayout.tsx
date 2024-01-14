import React from 'react';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
