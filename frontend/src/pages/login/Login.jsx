import React from 'react';

import { Box, Button, Input, InputLabel, Link, Checkbox } from '@mui/material';

function Login() {
  return (
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
          sx={{ display: 'flex', justifyContent: 'center', paddingY: '50px' }}
        >
          <Box>
            <Box sx={{ paddingY: '20px' }}>
              <InputLabel sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                Username
              </InputLabel>
              <Input
                type="text"
                placeholder="Please Enter Username"
                required
                sx={{ width: '300px' }}
              />
            </Box>
            <Box sx={{ paddingY: '20px' }}>
              <InputLabel sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                Password
              </InputLabel>
              <Input
                type="password"
                required
                placeholder="Please Enter Password"
                sx={{ width: '300px' }}
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
                <Checkbox />
                <InputLabel>Remember me</InputLabel>
              </Box>
              <Box>
                <Link to="/forgot-password">Forgot password?</Link>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Button variant="contained" sx={{ marginTop: '20px' }}>
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
