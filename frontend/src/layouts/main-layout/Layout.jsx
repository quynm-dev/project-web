import React from 'react';
import { PropTypes } from 'prop-types';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import AppBar from '../../components/app-bar/AppBar';
import HotNews from '../../components/hot-news/HotNews';

function Layout({ children }) {
  return (
    <>
      <AppBar />
      <Header />
      <HotNews />
      {children}
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
