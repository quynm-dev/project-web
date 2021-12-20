import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function CartItem() {
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
            src="/images/products/product-01.jpeg"
            alt="product 01"
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
          <Box sx={{ fontWeight: 'bold' }}>Track 6 Class E - Low Top</Box>
          <Box sx={{ color: 'gray' }}>Giá: 1.190.000 VNĐ</Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ paddingRight: '50px' }}>
              <Box sx={{ width: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="size-label">Size</InputLabel>
                  <Select labelId="size-label" label="Size" defaultValue={38}>
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
                    defaultValue={100}
                  >
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={300}>300</MenuItem>
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
        <Box sx={{ color: '#f15e2c', fontWeight: 'bold' }}>1.190.000 VNĐ</Box>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          sx={{ fontWeight: '600', height: '55px  ' }}
        >
          XOÁ
        </Button>
      </Box>
    </Box>
  );
}

export default CartItem;
