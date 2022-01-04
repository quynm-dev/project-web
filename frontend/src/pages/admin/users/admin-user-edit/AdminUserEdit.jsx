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
import axiosClient from '../../../../api/axios';

import Loading from '../../../../components/loading/Loading';

function AdminUserEdit() {
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = () => {
    if (JSON.stringify(editedUser) === JSON.stringify(user)) {
      navigate('/admin/users');
      return;
    }
    axiosClient
      .put(`/users/${id}`, editedUser)
      .then(() => {
        setSnackbarMessage('Edit success');
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

  const handleEditedUserChange = (event) => {
    setEditedUser({ ...editedUser, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get(`/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setEditedUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
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
                  value={editedUser.name}
                  onChange={handleEditedUserChange}
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
                  value={editedUser.username}
                  onChange={handleEditedUserChange}
                  readOnly
                />
              </Box>
              <Box sx={{ paddingY: '20px' }}>
                <Box sx={{ width: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      label="Role"
                      value={editedUser.role ? editedUser.role : ''}
                      onChange={handleEditedUserChange}
                      name="role"
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
