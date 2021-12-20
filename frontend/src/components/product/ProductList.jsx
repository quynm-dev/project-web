import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Pagination } from '@mui/material';

import Product from './Product';
import axiosClient from '../../api/axios';

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const onPageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    axiosClient
      .get(`/products?page=${page}`)
      .then((res) => {
        setProducts(res.data);
        if (page === 1) {
          navigate('/products');
          return;
        }
        navigate(`/products?page=${page}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate, page]);

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
            />
          );
        })}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingY: '30px' }}>
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          onChange={onPageChange}
        />
      </Box>
    </Box>
  );
}

export default ProductList;
