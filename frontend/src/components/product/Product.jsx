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
import { useDispatch } from 'react-redux';
import { addToShoppingCart, removeFromShoppingCart } from '../../redux/actions';

function Product({
  productImageUrl,
  productName,
  productBrand,
  productPrice,
  width,
  id,
  showHeartIcon,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAddedToShoppingCart, setIsAddedToShoppingCart] = useState(false);

  const handleRedirectProductDetail = () => {
    return navigate(`/products/${id}`);
  };

  const handleAddToShoppingCart = () => {
    setIsAddedToShoppingCart(!isAddedToShoppingCart);
    if (!isAddedToShoppingCart) {
      dispatch(addToShoppingCart(id));
    } else {
      dispatch(removeFromShoppingCart(id));
    }
  };

  return (
    <Box sx={{ width: width, padding: '10px' }}>
      <Card
        sx={{
          width: '100%',
        }}
        elevation={0}
        className="product"
        variant="outlined"
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            image={productImageUrl}
            component="img"
            onClick={() => handleRedirectProductDetail(id)}
          />
          {showHeartIcon ? (
            <IconButton
              sx={{
                position: 'absolute',
                right: 4,
                bottom: 4,
                p: 1,
                color: '#f15e2c',
              }}
              onClick={handleAddToShoppingCart}
            >
              {isAddedToShoppingCart ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          ) : (
            ''
          )}
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
    </Box>
  );
}

Product.propTypes = {
  productImageUrl: PropTypes.string,
  productName: PropTypes.string,
  productBrand: PropTypes.string,
  productPrice: PropTypes.number,
  width: PropTypes.string,
  id: PropTypes.number,
  showHeartIcon: PropTypes.bool,
};

Product.defaultProps = {
  productImageUrl: '',
  productName: '',
  productBrand: '',
  productPrice: 0.0,
  width: '',
  id: 0,
  showHeartIcon: true,
};

export default Product;
