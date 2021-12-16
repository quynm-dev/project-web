import { Box, Container } from '@mui/material';
import BestSeller from '../../components/best-seller/BestSeller';
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
        <BestSeller />
      </Container>
    </Box>
  );
}

export default Homepage;
