import React from 'react';
import { Box, Card, CardMedia, CardContent, Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Product({
  productImageUrl,
  productName,
  productBrand,
  productPrice,
  width,
}) {
  return (
    <Card sx={{ width: width, marginY: '20px' }} className="product">
      <Box sx={{ position: 'relative' }}>
        <CardMedia image={productImageUrl} component="img" />
        <Button sx={{ position: 'absolute', right: '0', bottom: '0' }}>
          <FavoriteBorderIcon />
        </Button>
      </Box>
      <CardContent sx={{ textAlign: 'center' }}>
        <Box sx={{ fontWeight: 'bold', paddingY: '2px' }}>{productName}</Box>
        <Box sx={{ paddingY: '2px' }}>{productBrand}</Box>
        <Box sx={{ fontWeight: 'bold', padding: '2px' }}>{productPrice}</Box>
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
