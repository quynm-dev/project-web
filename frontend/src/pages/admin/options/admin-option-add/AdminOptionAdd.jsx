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

function AdminOptionEdit() {
  const [option, setOption] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleAdd = () => {
    axiosClient
      .post(`/options`, option)
      .then(() => {
        setSnackbarMessage('Add success');
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

  const handleOptionChange = (event) => {
    setOption({
      ...option,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get(`/products`)
      .then((res) => {
        setProducts(res.data);
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
                <Box sx={{ width: 250 }}>
                  <FormControl fullWidth>
                    <InputLabel id="product-name-label">
                      Product Name
                    </InputLabel>
                    <Select
                      labelId="product-name-label"
                      label="Product Name"
                      onChange={handleOptionChange}
                      name="product_name"
                    >
                      {products.map((product) => {
                        return (
                          <MenuItem value={product.name}>
                            {product.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
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
                  onChange={handleOptionChange}
                />
              </Box>
              <Box sx={{ paddingY: '20px' }}>
                <InputLabel
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                  htmlFor="quantity"
                >
                  Quantity
                </InputLabel>
                <Input
                  type="text"
                  sx={{ width: '300px' }}
                  id="quantity"
                  name="quantity"
                  onChange={handleOptionChange}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleAdd}>
                  Add
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
