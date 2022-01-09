import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Snackbar,
  Alert,
  Modal,
  Input,
  InputLabel,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from './CartItem';
import axiosClient from '../../api/axios';
import { removeAllFromShoppingCart } from '../../redux/actions';

let cartItemsId = [];

function ShoppingCart() {
  const userId = useSelector((state) => {
    return state.user.id;
  });
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  cartItemsId = shoppingCart.map((shoppingCartItem) => {
    return shoppingCartItem.productId;
  });
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const [cartItems, setCartItems] = useState([]);

  const handleRemoveAllShoppingCart = () => {
    dispatch(removeAllFromShoppingCart());
    window.location.reload();
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const totalPricing = shoppingCart.reduce((sum, { pricing, quantity }) => {
    return sum + pricing * quantity;
  }, 0);

  const handleOrder = async () => {
    const res = await axiosClient.post('/orders', {
      user_id: userId,
      phone_number: phoneNumber,
      address,
      total_pricing: totalPricing,
    });

    await axiosClient
      .post(`orders/${res.data.order_id}/order-items`, {
        shoppingCart: JSON.stringify(shoppingCart),
      })
      .then(() => {
        setSnackbarMessage('Order success');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        handleClose();
      })
      .catch(() => {
        setSnackbarMessage('Order fail');
        setIsErrorSnackbarMessage(true);
        setShowSnackbar(true);
      });
    dispatch(removeAllFromShoppingCart());
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
    <form>
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
            {shoppingCart.length} sản phẩm
          </Box>
          <Box
            sx={{
              position: 'absolute',
              right: '50px',
              bottom: '0',
              color: 'gray',
              paddingBottom: '10px',
              fontWeight: 'bold',
            }}
          >
            Total: <span style={{ color: '#f15e2c' }}>{totalPricing} $</span>
          </Box>
        </Box>
        {shoppingCart.length === 0 || cartItems.length === 0
          ? ''
          : shoppingCart.map((shoppingCartItem, index) => {
              const cartItem = cartItems.filter((item) => {
                return item.id === shoppingCartItem.productId;
              })[0];

              return (
                <CartItem
                  cartItemName={cartItem.name}
                  cartItemPrice={cartItem.pricing}
                  cartItemSize={
                    shoppingCart[index] ? shoppingCart[index].size : 38
                  }
                  cartItemQuantity={
                    shoppingCart[index] ? shoppingCart[index].quantity : 1
                  }
                  cartItemImageUrl={cartItem.product_image_url}
                  cartItemId={cartItem.id}
                  key={cartItem.id + shoppingCart[index].size}
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
          <Button variant="contained" onClick={handleOpen}>
            ORDER
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                backgroundColor: 'background.paper',
                boxShadow: 24,
                p: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ paddingY: '15px' }}>
                <InputLabel
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                  htmlFor="phone-number"
                >
                  Phone Number
                </InputLabel>
                <Input
                  type="text"
                  required
                  placeholder="Please Enter Phone Number"
                  sx={{ width: '300px' }}
                  id="phone-number"
                  name="phone_number"
                  onChange={handlePhoneNumberChange}
                />
              </Box>
              <Box sx={{ paddingY: '15px' }}>
                <InputLabel
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                  htmlFor="address"
                >
                  Address
                </InputLabel>
                <Input
                  type="text"
                  required
                  placeholder="Please Enter Address"
                  sx={{ width: '300px' }}
                  id="address"
                  name="address"
                  onChange={handleAddressChange}
                />
              </Box>
              <Box
                sx={{
                  paddingTop: '20px',
                }}
              >
                <Button variant="outlined" onClick={handleOrder}>
                  ORDER
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity={isErrorSnackbarMessage ? 'error' : 'success'}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </form>
  );
}

export default ShoppingCart;
