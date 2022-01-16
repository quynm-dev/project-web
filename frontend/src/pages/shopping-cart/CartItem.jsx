import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axios';

import {
  removeFromShoppingCart,
  editCartItemQuantity,
  editCartItemSize,
} from '../../redux/actions';

function CartItem({
  cartItemName,
  cartItemPrice,
  cartItemSize,
  cartItemQuantity,
  cartItemImageUrl,
  cartItemId,
  isOrderDetail,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState({
    quantity: cartItemQuantity,
    size: cartItemSize,
  });

  const handleCartItemChange = async (event) => {
    const res = await axiosClient.get('/cart-item/option', {
      params: {
        product_id: cartItemId,
        size: event.target.name === 'size' ? event.target.value : cartItem.size,
      },
    });
    const option = res.data;

    if (event.target.name === 'size') {
      if (option.quantity < cartItem.quantity) {
        dispatch(removeFromShoppingCart(cartItemId, cartItem.size));
        window.location.reload();
        return;
      }
      setCartItem({ ...cartItem, size: event.target.value });
      dispatch(
        editCartItemSize(
          cartItemId,
          event.target.value,
          cartItem.quantity,
          cartItemSize,
          cartItemPrice,
        ),
      );
      window.location.reload();
      return;
    }
    if (option.quantity < event.target.value) {
      console.log('quantity');
      dispatch(removeFromShoppingCart(cartItemId, cartItem.size));
      window.location.reload();
      return;
    }
    setCartItem({ ...cartItem, quantity: event.target.value });
    dispatch(
      editCartItemQuantity(
        cartItemId,
        cartItem.size,
        event.target.value,
        cartItemPrice,
      ),
    );
    window.location.reload();
  };

  const handleRemoveCartItem = () => {
    dispatch(removeFromShoppingCart(cartItemId, cartItem.size));
    window.location.reload();
  };

  const handleRedirectProductDetail = () => {
    navigate(`/products/${cartItemId}`);
  };

  return (
    <Box
      sx={{
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        width: '80%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        paddingY: '30px',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{ paddingRight: '20px', cursor: 'pointer' }}
          onClick={handleRedirectProductDetail}
        >
          <img
            src={cartItemImageUrl}
            alt={cartItemName}
            style={{ width: '200px' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Link
            style={{
              textDecoration: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            to={`/products/${cartItemId}`}
          >
            {cartItemName}
          </Link>
          <Box sx={{ color: 'gray' }}>Giá: {cartItemPrice} $</Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ paddingRight: '50px' }}>
              <Box sx={{ width: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="size-label">Size</InputLabel>
                  <Select
                    labelId="size-label"
                    label="Size"
                    defaultValue={cartItemSize}
                    onChange={handleCartItemChange}
                    name="size"
                    readOnly={isOrderDetail}
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
                  <InputLabel id="quantity-label">Số lượng</InputLabel>
                  <Select
                    labelId="quantity-label"
                    label="quantity"
                    defaultValue={cartItemQuantity}
                    name="quantity"
                    onChange={handleCartItemChange}
                    readOnly={isOrderDetail}
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
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ color: '#f15e2c', fontWeight: 'bold' }}>
          {cartItem.quantity * cartItemPrice} $
        </Box>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          sx={{ fontWeight: '600', height: '55px  ' }}
          onClick={handleRemoveCartItem}
          disabled={isOrderDetail}
        >
          XOÁ
        </Button>
      </Box>
    </Box>
  );
}

CartItem.propTypes = {
  cartItemName: PropTypes.string,
  cartItemPrice: PropTypes.number,
  cartItemSize: PropTypes.number,
  cartItemQuantity: PropTypes.number,
  cartItemImageUrl: PropTypes.string,
  cartItemId: PropTypes.number,
  isOrderDetail: PropTypes.bool,
};

CartItem.defaultProps = {
  cartItemName: '',
  cartItemPrice: 0,
  cartItemSize: 38,
  cartItemQuantity: 1,
  cartItemImageUrl: '',
  cartItemId: 0,
  isOrderDetail: false,
};

export default CartItem;
