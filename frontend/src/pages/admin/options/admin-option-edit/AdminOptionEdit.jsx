import { useState, useEffect } from 'react';
import { InputLabel, Input, Box, Button, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../../../api/axios';

import Loading from '../../../../components/loading/Loading';

function AdminOptionEdit() {
  const [option, setOption] = useState({});
  const [editedOption, setEditedOption] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = () => {
    if (JSON.stringify(editedOption) === JSON.stringify(option)) {
      navigate('/admin/options');
      return;
    }
    axiosClient
      .put(`/options/${id}`, editedOption)
      .then(() => {
        setSnackbarMessage('Edit success');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        setTimeout(() => {
          navigate('/admin/options');
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

  const handleEditedOptionChange = (event) => {
    setEditedOption({
      ...editedOption,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get(`/options/${id}`)
      .then((res) => {
        setOption(res.data);
        setEditedOption(res.data);
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
                  Product Name
                </InputLabel>
                <Input
                  type="text"
                  sx={{ width: '300px' }}
                  id="name"
                  name="name"
                  value={editedOption.name}
                  onChange={handleEditedOptionChange}
                  readOnly
                />
              </Box>
              <Box sx={{ paddingY: '20px' }}>
                <InputLabel
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                  htmlFor="size"
                >
                  Size
                </InputLabel>
                <Input
                  type="text"
                  sx={{ width: '300px' }}
                  id="size"
                  name="size"
                  value={editedOption.size}
                  onChange={handleEditedOptionChange}
                  readOnly
                />
              </Box>
              <Box sx={{ paddingY: '20px' }}>
                <InputLabel
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                  htmlFor="size"
                >
                  Quantity
                </InputLabel>
                <Input
                  type="text"
                  sx={{ width: '300px' }}
                  id="quantity"
                  name="quantity"
                  value={editedOption.quantity}
                  onChange={handleEditedOptionChange}
                />
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

export default AdminOptionEdit;
