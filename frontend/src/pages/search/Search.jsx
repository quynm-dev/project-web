import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';

import Product from '../../components/product/Product';
import axiosClient from '../../api/axios';

function ProductList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`/search?product-name=${searchParams.get('product-name')}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate, searchParams]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingX: '30px',
      }}
    >
      {products.length ? (
        <Box sx={{ paddingY: '50px' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '80%',
              margin: 'auto',
              paddingLeft: '50px',
            }}
          >
            {products.map((product) => {
              return (
                <Product
                  productImageUrl={product.product_image_url}
                  productBrand={product.brand_name}
                  productPrice={product.pricing}
                  productName={product.name}
                  width="30%"
                  id={product.id}
                  key={product.id}
                  showHeartIcon={false}
                />
              );
            })}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ paddingY: '100px' }}>
            <Box
              sx={{
                fontWeight: 'bold',
                fontSize: '50px',
                paddingY: '50px',
              }}
            >
              404
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProductList;
