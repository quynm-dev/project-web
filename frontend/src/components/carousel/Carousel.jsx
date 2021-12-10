import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import './styles.css';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function Carousel() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation
      className="mySwiper"
    >
      <SwiperSlide>
        <img src="/images/carousel/slide-01.jpeg" alt="slide 01" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/carousel/slide-02.jpeg" alt="slide 02" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/carousel/slide-03.jpeg" alt="slide 03" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/carousel/slide-04.jpeg" alt="slide 04" />
      </SwiperSlide>
    </Swiper>
  );
}
