import React from 'react';
import Header from '../pages/header';
import Footer from './footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className=''>
      <Header />
      <div className=''>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
