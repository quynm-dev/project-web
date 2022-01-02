import { useState, useEffect } from 'react';
import {
  InputLabel,
  Input,
  Box,
  MenuItem,
  Select,
  FormControl,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosClient from '../../../../api/axios';

import Loading from '../../../../components/loading/Loading';

function AdminUserEdit() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [role, setRole] = useState(
    useSelector((state) => {
      return state.user.role;
    }),
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = () => {
    axiosClient
      .put(`/users/${id}`, {
        name,
        username,
        role,
      })
      .then(() => {
        setSnackbarMessage('Edit sucess');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        setTimeout(() => {
          navigate('/admin/users');
        }, 1000);
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.message);
        setIsErrorSnackbarMessage(true);
        setShowSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get(`/users/${id}`)
      .then((res) => {
        setName(res.data.name);
        setUsername(res.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  }, [id, navigate]);

  return (
    <form>
      <Box>
        {!isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingY: '20px',
            }}
          >
            <Box>
              <Box sx={{ paddingY: '20px' }}>
                <InputLabel
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                  htmlFor="name"
                >
                  Name
                </InputLabel>
                <Input
                  type="text"
                  sx={{ width: '300px' }}
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </Box>
              <Box sx={{ paddingY: '20px' }}>
                <InputLabel
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                  htmlFor="username"
                >
                  Username
                </InputLabel>
                <Input
                  type="text"
                  sx={{ width: '300px' }}
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Box>
              <Box sx={{ paddingY: '20px' }}>
                <Box sx={{ width: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      label="Role"
                      defaultValue={role}
                      onChange={handleRoleChange}
                    >
                      <MenuItem value="user">user</MenuItem>
                      <MenuItem value="admin">admin</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleEdit}>
                  Edit
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Loading />
        )}
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

export default AdminUserEdit;
