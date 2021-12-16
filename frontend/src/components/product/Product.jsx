import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import React from 'react';

function Product({
  productImageUrl,
  productName,
  productBrand,
  productPrice,
  width,
}) {
  return (
    <Card
      sx={{ width: width, marginY: '20px' }}
      elevation={0}
      className="product"
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia image={productImageUrl} component="img" />
        <IconButton sx={{ position: 'absolute', right: 4, bottom: 4, p: 1 }}>
          <FavoriteBorderIcon />
        </IconButton>
      </Box>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', paddingY: '2px', fontSize: 15 }}
        >
          {productName}
        </Typography>
        <Typography variant="body2" sx={{ paddingY: '2px' }}>
          {productBrand}
        </Typography>
        <Typography sx={{ fontWeight: 'bold', padding: '2px' }}>
          {productPrice}
        </Typography>
      </CardContent>
    </Card>
  );
}

Product.propTypes = {
  productImageUrl: PropTypes.element.isRequired,
  productName: PropTypes.element.isRequired,
  productBrand: PropTypes.element.isRequired,
  productPrice: PropTypes.element.isRequired,
  width: PropTypes.element.isRequired,
};

export default Product;
