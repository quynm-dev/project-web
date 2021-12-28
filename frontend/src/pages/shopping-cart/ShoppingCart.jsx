import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CartItem from './CartItem';
import axiosClient from '../../api/axios';
import { removeAllFromShoppingCart } from '../../redux/actions';

function ShoppingCart() {
  const cartItemsId = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const handleRemoveAllShoppingCart = () => {
    dispatch(removeAllFromShoppingCart());
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  useEffect(() => {
    axiosClient
      .post('/cart-items', {
        cartItemsId,
      })
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cartItemsId]);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          padding: '50px',
          width: '80%',
          margin: 'auto',
        }}
      >
        <Box sx={{ fontWeight: 'bold', fontSize: '25px' }}>
          DANH MỤC YÊU THÍCH CỦA BẠN
        </Box>
        <Box
          sx={{
            position: 'absolute',
            left: '50px',
            bottom: '0',
            color: 'gray',
            paddingBottom: '10px',
            fontWeight: 'bold',
          }}
        >
          {cartItems.length} sản phẩm
        </Box>
      </Box>
      {cartItems.map((cartItem) => {
        return (
          <CartItem
            cartItemName={cartItem.name}
            cartItemPrice={cartItem.pricing}
            cartItemSize={cartItem.size}
            cartItemQuantity={cartItem.quantity}
            cartItemImageUrl={cartItem.product_image_url}
            cartItemId={cartItem.id}
            key={cartItem.id}
          />
        );
      })}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '80%',
          margin: '20px auto',
        }}
      >
        <Button variant="contained" onClick={handleRemoveAllShoppingCart}>
          XOÁ HẾT
        </Button>
        <Button variant="contained" onClick={handleContinueShopping}>
          TIẾP TỤC MUA HÀNG
        </Button>
      </Box>
    </Box>
  );
}

export default ShoppingCart;
