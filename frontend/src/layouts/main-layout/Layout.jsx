import React from 'react';
import { PropTypes } from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import AppBar from '../../components/app-bar/AppBar';
import HotNews from '../../components/hot-news/HotNews';
import SlickList from '../../components/slick-list/SlickList';
import AdminHeader from '../../components/admin-header/AdminHeader';

function Layout({ children }) {
  const location = useLocation();
  const role = useSelector((state) => {
    return state.user.role;
  });

  return (
    <Box>
      {location.pathname === '/login' || location.pathname === '/register' ? (
        <Box>{children}</Box>
      ) : (
        <Box>
          {role === 'user' ? (
            <>
              <AppBar />
              <Header />
              <HotNews />
              {children}
              {location.pathname === '/products' ||
              location.pathname === '/search' ||
              location.pathname === '/' ? (
                <Box sx={{ width: '80%', margin: 'auto' }}>
                  <SlickList type="new-products" />
                </Box>
              ) : (
                ''
              )}

              <Footer />
            </>
          ) : (
            <>
              <AdminHeader />
              {children}
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
