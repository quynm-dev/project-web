import React from 'react';
import { Box, Button } from '@mui/material';

import CartItem from './CartItem';

function ShoppingCart() {
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
          1 sản phẩm
        </Box>
      </Box>
      <CartItem />
      <CartItem />
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
