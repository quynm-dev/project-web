import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartItem from '../shopping-cart/CartItem';
import axiosClient from '../../api/axios';

function OrderDetail() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPricing, setTotalPricing] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const role = useSelector((state) => {
    return state.user.role;
  });

  const handleRedirectHomepage = () => {
    navigate('/');
  };

  useEffect(() => {
    axiosClient
      .get(`/orders/${id}`)
      .then((res) => {
        setCartItems(res.data);
        setTotalPricing(
          res.data.reduce((sum, { pricing, quantity }) => {
            return sum + pricing * quantity;
          }, 0),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, role]);

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
          <Box sx={{ fontWeight: 'bold', fontSize: '25px' }}>ORDER DETAIL</Box>
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
        {cartItems.map((cartItem) => {
          return (
            <CartItem
              cartItemName={cartItem.product_name}
              cartItemPrice={cartItem.pricing}
              cartItemSize={cartItem.size}
              cartItemQuantity={cartItem.quantity}
              cartItemImageUrl={cartItem.product_image_url}
              cartItemId={cartItem.id}
              key={cartItem.id + cartItem.size}
              isOrderDetail
            />
          );
        })}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            width: '80%',
            margin: '20px auto',
          }}
        >
          {role === 'user' ? (
            <Button variant="contained" onClick={handleRedirectHomepage}>
              TIẾP TỤC MUA SẮM
            </Button>
          ) : (
            ''
          )}
        </Box>
      </Box>
    </form>
  );
}

export default OrderDetail;
