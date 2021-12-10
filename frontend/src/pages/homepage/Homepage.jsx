import React from 'react';
import { Box } from '@mui/material';

import Layout from '../../layouts/main-layout/Layout';
import ProductList from '../../components/product/ProductList';
import Carousel from '../../components/carousel/Carousel';

function Homepage() {
  return (
    <Layout>
      <Carousel />
      <ProductList />
      <Box>
        <img
          src="/images/homepage/banner.jpeg"
          alt="banner"
          style={{ width: '100%' }}
        />
      </Box>
    </Layout>
  );
}

export default Homepage;
