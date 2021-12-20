import {
  Box,
  Typography,
  Breadcrumbs,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Button,
  Container,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axiosClient from '../../api/axios';

import BestSeller from '../../components/best-seller/BestSeller';

function ProductDetail() {
  const [product, setProduct] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axiosClient
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <Box>
      {product ? (
        <Box sx={{ paddingTop: '20px' }}>
          <Box
            sx={{
              width: '80%',
              margin: 'auto',
              borderBottom: '1px dashed #979797',
              paddingBottom: '100px',
            }}
          >
            <Box
              sx={{
                borderBottom: '2px solid black',
                marginBottom: '30px',
                paddingBottom: '5px',
              }}
            >
              <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">
                  {product.brand_name}
                </Typography>
                <Typography color="text.primary">{product.name}</Typography>
              </Breadcrumbs>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{ width: '50%', paddingRight: '20px', paddingTop: '20px' }}
              >
                <img
                  src={product.product_image_url}
                  alt={product.name}
                  style={{ width: '100%' }}
                />
              </Box>
              <Box
                sx={{
                  width: '50%',
                  paddingLeft: '20px',
                  paddingTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ fontWeight: 'bold', fontSize: '30px' }}>
                  {product.name}
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box>Tình trạng:</Box>
                  <Box sx={{ paddingX: '5px', fontWeight: '600' }}>
                    Còn hàng
                  </Box>
                </Box>
                <Box
                  sx={{
                    fontSize: '20px',
                    color: '#f15e2c',
                    fontWeight: 'bold',
                  }}
                >
                  {product.pricing} $
                </Box>
                <Box
                  sx={{
                    lineHeight: '1.5',
                    borderTop: '1px dashed #979797',
                    borderBottom: '1px dashed #979797',
                    paddingY: '20px',
                  }}
                >
                  {product.description}
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ paddingRight: '50px' }}>
                    <Box sx={{ width: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="size-label">Size</InputLabel>
                        <Select
                          labelId="size-label"
                          label="Size"
                          defaultValue={38}
                        >
                          <MenuItem value={38}>38</MenuItem>
                          <MenuItem value={39}>39</MenuItem>
                          <MenuItem value={40}>40</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{ width: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="quantity-label">Số lượng</InputLabel>
                        <Select
                          labelId="quantity-label"
                          label="quantity"
                          defaultValue={100}
                        >
                          <MenuItem value={100}>100</MenuItem>
                          <MenuItem value={200}>200</MenuItem>
                          <MenuItem value={300}>300</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
                <Button variant="contained" sx={{ marginBottom: '5px' }}>
                  THÊM VÀO GIỎ HÀNG
                </Button>
              </Box>
            </Box>
          </Box>
          <Container>
            <BestSeller />
          </Container>
        </Box>
      ) : (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', paddingY: '30px' }}
        >
          <LoadingButton loading />
        </Box>
      )}
    </Box>
  );
}

export default ProductDetail;
