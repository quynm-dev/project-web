import { useState } from 'react';
import { Toolbar, Box, AppBar, Button, Menu, MenuItem } from '@mui/material';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';
import FaceIcon from '@mui/icons-material/Face';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminHeader() {
  const token = useSelector((state) => {
    return state.user ? state.user.token : '';
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirectUserProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            backgroundColor: '#303030',
            justifyContent: 'flex-end',
          }}
        >
          <Link to="/admin/orders" style={{ textDecoration: 'none' }}>
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
                Đơn hàng
              </Box>
            </Box>
          </Link>
          <Link to="/admin/products" style={{ textDecoration: 'none' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', paddingX: '15px' }}
            >
              <Box>
                <ArticleOutlinedIcon />
              </Box>
              <Box
                sx={{
                  paddingLeft: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                }}
              >
                Sản phẩm
              </Box>
            </Box>
          </Link>
          <Link to="/admin/users" style={{ textDecoration: 'none' }}>
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
                User
              </Box>
            </Box>
          </Link>
          <Link to="/admin/options" style={{ textDecoration: 'none' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', paddingX: '15px' }}
            >
              <Box>
                <ChangeCircleOutlinedIcon />
              </Box>
              <Box
                sx={{
                  paddingLeft: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                }}
              >
                Option
              </Box>
            </Box>
          </Link>
          <Link to="/admin/rates" style={{ textDecoration: 'none' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', paddingX: '15px' }}
            >
              <Box>
                <ReviewsRoundedIcon />
              </Box>
              <Box
                sx={{
                  paddingLeft: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                }}
              >
                Rates
              </Box>
            </Box>
          </Link>
          {!token ? (
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
          ) : (
            <Box>
              <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="outlined"
              >
                <FaceIcon sx={{ color: 'white', fontSize: '30px' }} />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleRedirectUserProfile}>
                  User Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          paddingTop: '50px',
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '10px',
        }}
      >
        <img src="/images/login/logo-ananas.svg" alt="banner" />
      </Box>
    </Box>
  );
}
