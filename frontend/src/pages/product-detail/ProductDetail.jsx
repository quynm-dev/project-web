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
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToShoppingCart } from '../../redux/actions';

import axiosClient from '../../api/axios';

import BestSeller from '../../components/best-seller/BestSeller';
import Loading from '../../components/loading/Loading';

function ProductDetail() {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(38);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleAddToCart = () => {
    dispatch(addToShoppingCart(parseInt(id, 10), quantity, size));
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

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
                          onChange={handleSizeChange}
                        >
                          <MenuItem value={38}>38</MenuItem>
                          <MenuItem value={39}>39</MenuItem>
                          <MenuItem value={40}>40</MenuItem>
                          <MenuItem value={41}>41</MenuItem>
                          <MenuItem value={42}>42</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{ width: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="quantity-label">Quantity</InputLabel>
                        <Select
                          labelId="quantity-label"
                          label="Quantity"
                          defaultValue={1}
                          onChange={handleQuantityChange}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={6}>6</MenuItem>
                          <MenuItem value={7}>7</MenuItem>
                          <MenuItem value={8}>8</MenuItem>
                          <MenuItem value={9}>9</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  sx={{ marginBottom: '5px' }}
                  onClick={handleAddToCart}
                >
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
          sx={{ display: 'flex', justifyContent: 'center', paddingY: '100px' }}
        >
          <Loading />
        </Box>
      )}
    </Box>
  );
}

export default ProductDetail;
