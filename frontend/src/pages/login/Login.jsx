import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  InputLabel,
  Link,
  Checkbox,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import axiosClient from '../../api/axios';
import { login } from '../../redux/actions';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleSubmit = () => {
    axiosClient
      .post('/login', {
        username,
        password,
      })
      .then(async (res) => {
        setSnackbarMessage('Login success');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        dispatch(login(res.data.token, res.data.user.id, res.data.user.role));
        setTimeout(() => {
          if (res.data.user.role === 'user') {
            navigate('/');
          } else {
            navigate('/admin/users');
          }
        }, 1000);
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.message);
        setIsErrorSnackbarMessage(true);
        setShowSnackbar(true);
      });
  };

  return (
    <form>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          alignItems: 'center',
        }}
      >
        <Box>
          <Box>
            <img src="/images/login/logo-ananas.svg" alt="banner" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingY: '50px',
            }}
          >
            <Box>
              <Box sx={{ paddingY: '20px' }}>
                <InputLabel
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                  htmlFor="username"
                >
                  Username
                </InputLabel>
                <Input
                  type="text"
                  placeholder="Please Enter Username"
                  required
                  sx={{ width: '300px' }}
                  id="username"
                  onChange={handleUsernameChange}
                  name="username"
                />
              </Box>
              <Box sx={{ paddingY: '20px' }}>
                <InputLabel
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                  htmlFor="password"
                >
                  Password
                </InputLabel>
                <Input
                  type="password"
                  required
                  placeholder="Please Enter Password"
                  sx={{ width: '300px' }}
                  id="password"
                  onChange={handlePasswordChange}
                  name="password"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '300px',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    left: '-10px',
                  }}
                >
                  <Checkbox id="remember" />
                  <InputLabel htmlFor="remember" sx={{ cursor: 'pointer' }}>
                    Remember me
                  </InputLabel>
                </Box>
                <Box>
                  <Link
                    to="/forgot-password"
                    style={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
                    Forgot password?
                  </Link>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  sx={{ marginTop: '20px' }}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
            }}
            onClick={() => {
              navigate('/register');
            }}
          >
            <Link
              to="/register"
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              Create Your Account
              <ArrowRightAltIcon style={{ position: 'relative', top: '6px' }} />
            </Link>
          </Box>
        </Box>
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
    </form>
  );
}

export default Login;
