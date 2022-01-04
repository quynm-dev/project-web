import React, { useState } from 'react';
import { Box, Button, Input, InputLabel, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axiosClient from '../../api/axios';

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const role = useSelector((state) => {
    return state.user.role;
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const onSubmit = () => {
    axiosClient
      .post('/register', {
        name,
        username,
        password,
        password_confirmation: confirmPassword,
      })
      .then(() => {
        setSnackbarMessage('Register success');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        setTimeout(() => {
          if (role === 'admin') {
            navigate('/admin/users');
            return;
          }
          navigate('/login');
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
            sx={{ display: 'flex', justifyContent: 'center', paddingY: '30px' }}
          >
            <Box>
              <Box sx={{ paddingY: '15px' }}>
                <InputLabel
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                  htmlFor="name"
                >
                  Name
                </InputLabel>
                <Input
                  type="text"
                  placeholder="Please Enter Name"
                  required
                  sx={{ width: '300px' }}
                  id="name"
                  onChange={handleNameChange}
                  name="name"
                />
              </Box>
              <Box sx={{ paddingY: '15px' }}>
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
              <Box sx={{ paddingY: '15px' }}>
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
              <Box sx={{ paddingY: '15px' }}>
                <InputLabel
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </InputLabel>
                <Input
                  type="password"
                  required
                  placeholder="Please Enter Confirm Password"
                  sx={{ width: '300px' }}
                  id="confirm-password"
                  onChange={handleConfirmPasswordChange}
                  name="confirmPassword"
                />
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  sx={{ marginTop: '20px' }}
                  onClick={onSubmit}
                >
                  Register
                </Button>
              </Box>
            </Box>
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

export default Register;
