import { Box } from '@mui/material';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

function Promotion({ promotionImageUrl, promotionName, promotionDescription }) {
  return (
    <Box sx={{ width: '40%', padding: '40px' }}>
      <Link to="/">
        <Box
          sx={{
            width: '100%',
            height: '350px',
            backgroundImage: `url(${promotionImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Link>
      <Box sx={{ fontWeight: 'bold', fontSize: '30px', paddingY: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          {promotionName.toUpperCase()}
        </Link>
      </Box>
      <Box sx={{ lineHeight: '1.5' }}>{promotionDescription}</Box>
    </Box>
  );
}
Promotion.propTypes = {
  promotionImageUrl: PropTypes.string,
  promotionName: PropTypes.string,
  promotionDescription: PropTypes.string,
};

Promotion.defaultProps = {
  promotionImageUrl: '',
  promotionName: '',
  promotionDescription: '',
};

export default Promotion;
