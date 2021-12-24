import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Product({
  productImageUrl,
  productName,
  productBrand,
  productPrice,
  width,
  id,
}) {
  const navigate = useNavigate();

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const onRedirectProductDetail = () => {
    return navigate(`/products/${id}`);
  };

  const onAddToCart = () => {
    setIsAddedToCart(!isAddedToCart);
  };

  return (
    <Card
      sx={{ width: width, marginY: '20px' }}
      elevation={0}
      className="product"
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          image={productImageUrl}
          component="img"
          onClick={() => onRedirectProductDetail(id)}
        />
        <IconButton
          sx={{
            position: 'absolute',
            right: 4,
            bottom: 4,
            p: 1,
            color: '#f15e2c',
          }}
          onClick={onAddToCart}
        >
          {isAddedToCart ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography
          sx={{ fontWeight: 'bold', paddingY: '2px', fontSize: '15px' }}
        >
          <Link to={`/products/${id}`} style={{ textDecoration: 'none' }}>
            {productName}
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ paddingY: '2px' }}>
          {productBrand}
        </Typography>
        <Typography sx={{ fontWeight: 'bold', padding: '2px' }}>
          {productPrice} $
        </Typography>
      </CardContent>
    </Card>
  );
}

Product.propTypes = {
  productImageUrl: PropTypes.string,
  productName: PropTypes.string,
  productBrand: PropTypes.string,
  productPrice: PropTypes.number,
  width: PropTypes.string,
  id: PropTypes.number,
};

Product.defaultProps = {
  productImageUrl: '',
  productName: '',
  productBrand: '',
  productPrice: 0.0,
  width: '',
  id: 0,
};

export default Product;
