import * as React from 'react';
import { Button, Toolbar, Box, AppBar, Typography, Link } from '@mui/material';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

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
          <Button color="inherit" sx={{ paddingRight: '20px' }}>
            <PlagiarismOutlinedIcon />
            <Typography sx={{ paddingLeft: '10px', fontSize: '12px' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                Tra cứu đơn hàng
              </Link>
            </Typography>
          </Button>
          <Button color="inherit" sx={{ paddingRight: '20px' }}>
            <LocationOnOutlinedIcon />
            <Typography sx={{ paddingLeft: '10px', fontSize: '12px' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                Tìm cửa hàng
              </Link>
            </Typography>
          </Button>
          <Button color="inherit" sx={{ paddingRight: '20px' }}>
            <FavoriteBorderOutlinedIcon />
            <Typography sx={{ paddingLeft: '10px', fontSize: '12px' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                Yêu thích
              </Link>
            </Typography>
          </Button>
          <Button color="inherit" sx={{ paddingRight: '20px' }}>
            <PersonOutlineOutlinedIcon />
            <Typography sx={{ paddingLeft: '10px', fontSize: '12px' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                Đăng nhập
              </Link>
            </Typography>
          </Button>
          <Button color="inherit" sx={{ paddingRight: '20px' }}>
            <ShoppingCartOutlinedIcon />
            <Typography sx={{ paddingLeft: '10px', fontSize: '12px' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                Giỏ hàng (1)
              </Link>
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
