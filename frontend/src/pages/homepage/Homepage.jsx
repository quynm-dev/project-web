import { Box } from '@mui/material';

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
    </Box>
  );
}

export default Homepage;
