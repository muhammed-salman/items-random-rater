import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container mt-3 pb-5">
        {children}
      </div>
      <Footer />
    </div>
  );
  };