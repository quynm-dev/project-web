import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PropTypes } from 'prop-types';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

import Product from '../product/Product';
import axiosClient from '../../api/axios';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Pagination, Navigation]);

const useStyles = makeStyles({
  swiperNavigation: {
    display: 'flex',
    position: 'relative',

    '& .slick-list-swiper-button-prev, & .slick-list-swiper-button-next': {
      cursor: 'pointer',
      position: 'absolute',
    },

    '& .slick-list-swiper-button-prev': {
      left: '-50px',
    },

    '& .slick-list-swiper-button-next': {
      right: '-50px',
    },
  },
});

export default function SlickList({ type, productId }) {
  const [slickList, setSlickList] = useState([]);

  useEffect(() => {
    axiosClient
      .get(
        type === 'new-products'
          ? '/new-products'
          : `/products/${productId}/related-products`,
      )
      .then((res) => {
        setSlickList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [type, productId]);

  const classes = useStyles();

  return (
    <Box sx={{ paddingY: '50px' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        {type === 'new-products' ? 'NEW PRODUCTS' : 'RELATED PRODUCTS'}
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute', width: '100%', top: '35%' }}>
          <Box className={classes.swiperNavigation}>
            <Box className="slick-list-swiper-button-prev">
              <KeyboardArrowLeftRoundedIcon
                sx={{
                  fontSize: '50px',
                  color: '#939393',
                }}
              />
            </Box>
            <Box className="slick-list-swiper-button-next">
              <KeyboardArrowRightRoundedIcon
                sx={{
                  fontSize: '50px',
                  color: '#939393',
                }}
              />
            </Box>
          </Box>
        </Box>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          slidesPerGroup={4}
          loop
          loopFillGroupWithBlank
          style={{ padding: '20px 0' }}
          navigation={{
            nextEl: '.slick-list-swiper-button-prev',
            prevEl: '.slick-list-swiper-button-next',
          }}
        >
          {slickList.map((slickListItem) => {
            return (
              <SwiperSlide key={slickListItem.id}>
                <Product
                  productImageUrl={slickListItem.product_image_url}
                  productBrand={slickListItem.brand_name}
                  productPrice={slickListItem.pricing}
                  productName={slickListItem.name}
                  width="100%"
                  id={slickListItem.id}
                  showHeartIcon={false}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
}

SlickList.propTypes = {
  type: PropTypes.string,
  productId: PropTypes.number,
};

SlickList.defaultProps = {
  type: '',
  productId: 0,
};
