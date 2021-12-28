import * as React from 'react';
import { Toolbar, Box, AppBar } from '@mui/material';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            backgroundColor: '#303030',
            justifyContent: 'flex-end',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', paddingX: '15px' }}
            >
              <Box>
                <PlagiarismOutlinedIcon />
              </Box>
              <Box
                sx={{
                  paddingLeft: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                }}
              >
                Tra cứu đơn hàng
              </Box>
            </Box>
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', paddingX: '15px' }}
            >
              <Box>
                <LocationOnOutlinedIcon />
              </Box>
              <Box
                sx={{
                  paddingLeft: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                }}
              >
                Tìm cửa hàng
              </Box>
            </Box>
          </Link>
          <Link to="/shopping-cart" style={{ textDecoration: 'none' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', paddingX: '15px' }}
            >
              <Box>
                <FavoriteBorderOutlinedIcon />
              </Box>
              <Box
                sx={{
                  paddingLeft: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                }}
              >
                Yêu thích
              </Box>
            </Box>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', paddingX: '15px' }}
            >
              <Box>
                <PersonOutlineOutlinedIcon />
              </Box>
              <Box
                sx={{
                  paddingLeft: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                }}
              >
                Đăng nhập
              </Box>
            </Box>
          </Link>
          <Link to="/shopping-cart" style={{ textDecoration: 'none' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', paddingX: '15px' }}
            >
              <Box>
                <ShoppingCartOutlinedIcon />
              </Box>
              <Box
                sx={{
                  paddingLeft: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                }}
              >
                Giỏ hàng (1)
              </Box>
            </Box>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
