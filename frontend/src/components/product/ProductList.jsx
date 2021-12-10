import React from 'react';
import { Box, Pagination } from '@mui/material';

import Product from './Product';

function ProductList() {
  const products = [
    {
      productImageUrl: '/images/products/product-01.jpeg',
      productBrand: 'Botanist Green',
      productPrice: '1.190.000 VND',
      productName: 'Track 6 Class E - Low Top',
    },
    {
      productImageUrl: '/images/products/product-01.jpeg',
      productBrand: 'Botanist Green',
      productPrice: '1.190.000 VND',
      productName: 'Track 6 Class E - Low Top',
    },
    {
      productImageUrl: '/images/products/product-01.jpeg',
      productBrand: 'Botanist Green',
      productPrice: '1.190.000 VND',
      productName: 'Track 6 Class E - Low Top',
    },
    {
      productImageUrl: '/images/products/product-01.jpeg',
      productBrand: 'Botanist Green',
      productPrice: '1.190.000 VND',
      productName: 'Track 6 Class E - Low Top',
    },
  ];

  return (
    <Box sx={{ paddingY: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingX: '30px',
        }}
      >
        {products.map(
          ({ productImageUrl, productBrand, productPrice, productName }) => {
            return (
              <Product
                productImageUrl={productImageUrl}
                productBrand={productBrand}
                productPrice={productPrice}
                productName={productName}
              />
            );
          },
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingY: '30px' }}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Box>
    </Box>
  );
}

export default ProductList;
