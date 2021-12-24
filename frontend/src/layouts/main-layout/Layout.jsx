import React from 'react';
import { PropTypes } from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import AppBar from '../../components/app-bar/AppBar';
import HotNews from '../../components/hot-news/HotNews';

function Layout({ children }) {
  const location = useLocation();

  return (
    <Box>
      {location.pathname === '/login' || location.pathname === '/register' ? (
        <Box>{children}</Box>
      ) : (
        <>
          <AppBar />
          <Header />
          <HotNews />
          {children}
          <Footer />
        </>
      )}
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
