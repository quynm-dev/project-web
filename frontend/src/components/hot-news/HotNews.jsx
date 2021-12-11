import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function Carousel() {
  const hotNews = [
    'FREE SHIP HOÁ ĐƠN TỪ 800K!',
    'BUY MORE PAY LESS - ÁP DỤNG KHI MUA PHỤ KIỆN',
    'HÀNG 2 TUẦN NHẬN ĐỔI - GIÀY NỬA NĂM BẢO HÀNH',
    'BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC TEE',
  ];

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation
      loop
      style={{ backgroundColor: '#f1f1f1' }}
    >
      {hotNews.map((hotNew) => {
        return (
          <SwiperSlide style={{ backgroundColor: '#f1f1f1', height: '50px' }}>
            {hotNew}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
