import { Box, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Autoplay, Pagination, Navigation]);

const useStyles = makeStyles({
  hotNewsSwiper: {
    '& .swiper-button-next, & .swiper-button-prev': {
      backgroundColor: '#f1f1f1',
    },

    '& .swiper-button-prev': {
      left: 0,
    },

    '& .swiper-button-next': {
      right: 0,
    },

    '& .swiper-button-next::after, & .swiper-button-prev::after': {
      color: '#939393 !important',
      fontSize: '0.75rem',
    },
  },
});

export default function HotNews() {
  const hotNews = [
    'FREE SHIP HOÁ ĐƠN TỪ 800K!',
    'BUY MORE PAY LESS - ÁP DỤNG KHI MUA PHỤ KIỆN',
    'HÀNG 2 TUẦN NHẬN ĐỔI - GIÀY NỬA NĂM BẢO HÀNH',
    'BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC TEE',
  ];

  const classes = useStyles();

  return (
    <Box sx={{ backgroundColor: '#f1f1f1', width: '100%' }}>
      <Container>
        <Swiper
          spaceBetween={30}
          centeredSlides
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation
          loop
          className={classes.hotNewsSwiper}
        >
          {hotNews.map((hotNew) => {
            return (
              <SwiperSlide
                key={hotNew}
                style={{ height: '50px', backgroundColor: 'transparent' }}
                navigation={{
                  prevEl: 'hot-news-prev',
                  nextEl: 'hot-news-next',
                }}
              >
                {hotNew}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </Box>
  );
}
