import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Box } from '@mui/material';

import Product from '../product/Product';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Pagination, Navigation]);

export default function BestSeller() {
  const bestSellers = [
    {
      productImageUrl: '/images/products/product-01.jpeg',
      productName: 'VINTAS THE NEW MILITARY - HIGH TOP',
      productBrand: 'CAPULET OLIVE',
      productPrice: '495.000 VND',
    },
    {
      productImageUrl: '/images/products/product-01.jpeg',
      productName: 'VINTAS THE NEW MILITARY - HIGH TOP',
      productBrand: 'CAPULET OLIVE',
      productPrice: '495.000 VND',
    },
    {
      productImageUrl: '/images/products/product-01.jpeg',
      productName: 'VINTAS THE NEW MILITARY - HIGH TOP',
      productBrand: 'CAPULET OLIVE',
      productPrice: '495.000 VND',
    },
    {
      productImageUrl: '/images/products/product-01.jpeg',
      productName: 'VINTAS THE NEW MILITARY - HIGH TOP',
      productBrand: 'CAPULET OLIVE',
      productPrice: '495.000 VND',
    },
    {
      productImageUrl: '/images/products/product-01.jpeg',
      productName: 'VINTAS THE NEW MILITARY - HIGH TOP',
      productBrand: 'CAPULET OLIVE',
      productPrice: '495.000 VND',
    },
    {
      productImageUrl: '/images/products/product-01.jpeg',
      productName: 'VINTAS THE NEW MILITARY - HIGH TOP',
      productBrand: 'CAPULET OLIVE',
      productPrice: '495.000 VND',
    },
    {
      productImageUrl: '/images/products/product-01.jpeg',
      productName: 'VINTAS THE NEW MILITARY - HIGH TOP',
      productBrand: 'CAPULET OLIVE',
      productPrice: '495.000 VND',
    },
    {
      productImageUrl: '/images/products/product-01.jpeg',
      productName: 'VINTAS THE NEW MILITARY - HIGH TOP',
      productBrand: 'CAPULET OLIVE',
      productPrice: '495.000 VND',
    },
    {
      productImageUrl: '/images/products/product-01.jpeg',
      productName: 'VINTAS THE NEW MILITARY - HIGH TOP',
      productBrand: 'CAPULET OLIVE',
      productPrice: '495.000 VND',
    },
  ];
  return (
    <Box sx={{ paddingY: '50px' }}>
      <Box sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '30px' }}>
        BEST SELLER
      </Box>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        loop
        loopFillGroupWithBlank
        navigation
        style={{ padding: '20px 0' }}
      >
        {bestSellers.map((bestSeller) => {
          return (
            <SwiperSlide>
              <Product
                productImageUrl={bestSeller.productImageUrl}
                productBrand={bestSeller.productBrand}
                productPrice={bestSeller.productPrice}
                productName={bestSeller.productName}
                width="70%"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
