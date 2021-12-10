import React from 'react';
import { PropTypes } from 'prop-types';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
