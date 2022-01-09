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
    <Box>
      {products.length ? (
        <Box sx={{ paddingY: '20px' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              paddingX: '30px',
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
        'nothign'
      )}
    </Box>
  );
}

export default ProductList;
