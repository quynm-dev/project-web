import { Box, Container } from '@mui/material';

import SlickList from '../../components/slick-list/SlickList';
import Carousel from '../../components/carousel/Carousel';
import PromotionList from '../../components/promotion/PromotionList';

function Homepage() {
  return (
    <Box>
      <Carousel />
      <PromotionList />
      <Box>
        <img
          src="/images/homepage/banner.jpeg"
          alt="banner"
          style={{ width: '100%' }}
        />
      </Box>
      <Container>
        <SlickList type="best-seller" />
      </Container>
    </Box>
  );
}

export default Homepage;
