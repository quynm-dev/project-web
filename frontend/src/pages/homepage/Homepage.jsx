import React from 'react';
import { Box } from '@mui/material';

import Layout from '../../layouts/main-layout/Layout';
import HotNews from '../../components/hot-news/HotNews';
import Carousel from '../../components/carousel/Carousel';
import BestSeller from '../../components/best-seller/BestSeller';
import PromotionList from '../../components/promotion/PromotionList';

function Homepage() {
  return (
    <Layout>
      <HotNews />
      <Carousel />
      <PromotionList />
      <Box>
        <img
          src="/images/homepage/banner.jpeg"
          alt="banner"
          style={{ width: '100%' }}
        />
      </Box>
      <BestSeller />
    </Layout>
  );
}

export default Homepage;
