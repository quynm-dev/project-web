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
import { removeFromCart } from '../../redux/actions';

function CartItem({
  cartItemName,
  cartItemPrice,
  cartItemSize,
  cartItemQuantity,
  cartItemImageUrl,
  cartItemId,
}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleRemoveCartItem = () => {
    dispatch(removeFromCart(cartItemId));
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
        <Box sx={{ paddingRight: '20px' }}>
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
          <Box sx={{ fontWeight: 'bold' }}>{cartItemName}</Box>
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
                    defaultValue={cartItemQuantity}
                    onChange={handleQuantityChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
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
          {quantity * cartItemPrice} $
        </Box>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          sx={{ fontWeight: '600', height: '55px  ' }}
          onClick={handleRemoveCartItem}
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
};

CartItem.defaultProps = {
  cartItemName: '',
  cartItemPrice: 0,
  cartItemSize: 38,
  cartItemQuantity: 1,
  cartItemImageUrl: '',
  cartItemId: 0,
};

export default CartItem;
