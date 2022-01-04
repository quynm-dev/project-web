import React, { useState, useEffect } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from './CartItem';
import axiosClient from '../../api/axios';
import { removeAllFromShoppingCart, payment } from '../../redux/actions';

let cartItemsId = [];

function ShoppingCart() {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const [showSnackbar, setShowSnackbar] = useState(false);
  cartItemsId = shoppingCart.map((shoppingCartItem) => {
    return shoppingCartItem.productId;
  });
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);

  const handleRemoveAllShoppingCart = () => {
    dispatch(removeAllFromShoppingCart());
    window.location.reload();
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handlePayment = () => {
    setShowSnackbar(true);
    dispatch(payment());
    setTimeout(() => {
      window.location.reload();
    }, 1000);
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
  }, []);

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
      {cartItems.map((cartItem, index) => {
        return (
          <CartItem
            cartItemName={cartItem.name}
            cartItemPrice={cartItem.pricing}
            cartItemSize={shoppingCart[index] ? shoppingCart[index].size : 38}
            cartItemQuantity={
              shoppingCart[index] ? shoppingCart[index].quantity : 1
            }
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
        <Button variant="contained" onClick={handlePayment}>
          THANH TOÁN
        </Button>
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="success">Payment Succes</Alert>
      </Snackbar>
    </Box>
  );
}

export default ShoppingCart;
