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
  Modal,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosClient from '../../api/axios';

import Loading from '../../components/loading/Loading';

function Profile() {
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [passwordObject, setPasswordObject] = useState({});
  const navigate = useNavigate();
  const id = useSelector((state) => {
    return state.user.id;
  });
  const role = useSelector((state) => {
    return state.user.role;
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePasswordObjectChange = (event) => {
    setPasswordObject({
      ...passwordObject,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = () => {
    if (JSON.stringify(editedUser) === JSON.stringify(user)) {
      navigate('/');
      return;
    }
    axiosClient
      .put(`/users/${id}`, editedUser)
      .then(() => {
        setSnackbarMessage('Edit success');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.message);
        setIsErrorSnackbarMessage(true);
        setShowSnackbar(true);
      });
  };

  const handleUpdatePassword = () => {
    axiosClient
      .post(`users/${id}/update-password`, passwordObject)
      .then(() => {
        setSnackbarMessage('Change password success');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.message);
        setIsErrorSnackbarMessage(true);
        setShowSnackbar(true);
      });
    handleClose();
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
                      readOnly={role !== 'admin'}
                    >
                      <MenuItem value="user">user</MenuItem>
                      <MenuItem value="admin">admin</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" onClick={handleEdit}>
                  Edit
                </Button>
                <Button variant="outlined" onClick={handleOpen}>
                  Change Password
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 400,
                      backgroundColor: 'background.paper',
                      boxShadow: 24,
                      p: 6,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ paddingY: '15px' }}>
                      <InputLabel
                        sx={{ fontSize: '20px', fontWeight: 'bold' }}
                        htmlFor="current-password"
                      >
                        Current Password
                      </InputLabel>
                      <Input
                        type="password"
                        required
                        placeholder="Please Enter Current Password"
                        sx={{ width: '300px' }}
                        id="current-password"
                        name="current_password"
                        onChange={handlePasswordObjectChange}
                      />
                    </Box>
                    <Box sx={{ paddingY: '15px' }}>
                      <InputLabel
                        sx={{ fontSize: '20px', fontWeight: 'bold' }}
                        htmlFor="new-password"
                      >
                        New Password
                      </InputLabel>
                      <Input
                        type="password"
                        required
                        placeholder="Please Enter New Password"
                        sx={{ width: '300px' }}
                        id="new-password"
                        name="new_password"
                        onChange={handlePasswordObjectChange}
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
                        name="new_password_confirmation"
                        onChange={handlePasswordObjectChange}
                      />
                    </Box>
                    <Box
                      sx={{
                        paddingTop: '20px',
                      }}
                    >
                      <Button variant="outlined" onClick={handleUpdatePassword}>
                        Change Password
                      </Button>
                    </Box>
                  </Box>
                </Modal>
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

export default Profile;
