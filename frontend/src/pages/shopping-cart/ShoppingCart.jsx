import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import CartItem from './CartItem';
import axiosClient from '../../api/axios';

function ShoppingCart() {
  const cartItemsId = useSelector((state) => state.shoppingCart);

  const [cartItems, setCartItems] = useState([]);

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
        <Button variant="contained">XOÁ HẾT</Button>
        <Button variant="contained">TIẾP TỤC MUA HÀNG</Button>
      </Box>
    </Box>
  );
}

export default ShoppingCart;
