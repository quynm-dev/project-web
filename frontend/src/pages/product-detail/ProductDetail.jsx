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
  TextField,
} from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import StarRatingComponent from 'react-star-rating-component';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToShoppingCart } from '../../redux/actions';

import axiosClient from '../../api/axios';

import SlickList from '../../components/slick-list/SlickList';
import Loading from '../../components/loading/Loading';
import Rate from '../../components/rate/Rate';

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [size, setSize] = useState(38);
  const [rates, setRates] = useState([]);
  const [averageStar, setAverageStar] = useState(0.0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [options, setOptions] = useState([]);
  const [rating, setRating] = useState(0);
  const [rateComment, setRateComment] = useState('');
  const userId = useSelector((state) => {
    return state.user.id;
  });
  const [, setCountReload] = useState(0);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const reload = (prevCountReload) => {
    setCountReload(prevCountReload + 1);
  };

  const handleAddToCart = () => {
    setShowSnackbar(true);
    dispatch(
      addToShoppingCart(parseInt(id, 10), quantity, size, product.pricing),
    );
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const onStarClick = (nextValue) => {
    setRating(nextValue);
  };

  const handleCommentChange = (event) => {
    setRateComment(event.target.value);
  };

  const handleRate = () => {
    axiosClient.post('/rates', {
      user_id: userId,
      comment: rateComment,
      product_id: id,
      star: rating,
    });
    setCountReload(reload);
    window.location.reload();
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
    axiosClient
      .get(`/products/${id}/rates`)
      .then((res) => {
        setRates(res.data);
        if (res.data.length > 0) {
          setAverageStar(
            (
              res.data.reduce((sum, rate) => {
                return sum + rate.star;
              }, 0) / res.data.length
            ).toFixed(1),
          );
        }
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
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <Box>Tình trạng: </Box>
                      <Box sx={{ paddingX: '5px', fontWeight: '600' }}>
                        {renderQuantity()}
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ paddingRight: '5px' }}>Rate Count: </Box>
                      <Box>{rates.length}</Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: '20px',
                        color: '#f15e2c',
                        fontWeight: 'bold',
                      }}
                    >
                      {product.pricing * quantity} $
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ paddingRight: '5px' }}>Average Star: </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ paddingRight: '5px' }}>{averageStar}</Box>
                        <Box>
                          <StarOutlinedIcon style={{ color: '#ffbe00' }} />
                        </Box>
                      </Box>
                    </Box>
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '80%',
                margin: 'auto',
                alignItems: 'center',
                paddingY: '50px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Box>
                  <AccountCircleRoundedIcon style={{ fontSize: '60px' }} />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    paddingLeft: '20px',
                    paddingRight: '50px',
                  }}
                >
                  <Box>
                    <StarRatingComponent
                      name="rating"
                      starCount={5}
                      value={rating}
                      onStarClick={onStarClick}
                    />
                  </Box>
                  <Box>
                    <TextField
                      label="Comment "
                      variant="standard"
                      sx={{ width: '100%' }}
                      onChange={handleCommentChange}
                    />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Button variant="outlined" onClick={handleRate}>
                  Rate
                </Button>
              </Box>
            </Box>
            <Box>
              {rates.map((rate) => {
                return (
                  <Rate
                    key={rate.id}
                    username={rate.username}
                    comment={rate.comment}
                    time={rate.created_at}
                    rateStar={rate.star}
                    userId={userId}
                    userRateId={rate.user_id}
                    id={rate.id}
                    reload={() => {
                      window.location.reload();
                      setCountReload(reload);
                    }}
                  />
                );
              })}
            </Box>
            <Container>
              <SlickList type="related-products" productId={parseInt(id, 10)} />
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
