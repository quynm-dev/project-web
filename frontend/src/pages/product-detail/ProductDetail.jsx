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
  Alert,
  Snackbar,
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
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [size, setSize] = useState(38);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [options, setOptions] = useState([]);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleAddToCart = () => {
    setShowSnackbar(true);
    dispatch(addToShoppingCart(parseInt(id, 10), quantity, size));
    axiosClient
      .post(`products/${id}/options`, {
        size,
        quantity,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const renderQuantity = () => {
    if (options.length === 0) {
      return '';
    }

    if (options[size % 38].quantity > 0) {
      return options[size % 38].quantity;
    }

    return 'Hết hàng';
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
    axiosClient
      .get(`/products/${id}/options`)
      .then((res) => {
        setOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <form>
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
                  sx={{
                    width: '50%',
                    paddingRight: '20px',
                    paddingTop: '20px',
                  }}
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
                    <Box>Tình trạng: </Box>
                    <Box sx={{ paddingX: '5px', fontWeight: '600' }}>
                      {renderQuantity()}
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
                            {options.map((option) => {
                              return (
                                <MenuItem value={option.size} key={option.id}>
                                  {option.size}
                                </MenuItem>
                              );
                            })}
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
                    disabled={
                      options.length > 0
                        ? !(options[size % 38].quantity > 0) ||
                          quantity > options[size % 38].quantity
                        : false
                    }
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
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingY: '100px',
            }}
          >
            <Loading />
          </Box>
        )}
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="success">Added to cart</Alert>
      </Snackbar>
    </form>
  );
}

export default ProductDetail;
