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
  TextField,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../../../api/axios';

import Loading from '../../../../components/loading/Loading';

function AdminUserEdit() {
  const [product, setProduct] = useState({});
  const [editedProduct, setEditedProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [listBrands, setListBrands] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = () => {
    if (JSON.stringify(editedProduct) === JSON.stringify(product)) {
      navigate('/admin/products');
      return;
    }
    axiosClient
      .put(`/products/${id}`, editedProduct)
      .then(() => {
        setSnackbarMessage('Edit success');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        setTimeout(() => {
          navigate('/admin/products');
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

  const handleEditedProductChange = (event) => {
    setEditedProduct({
      ...editedProduct,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setEditedProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosClient
      .get('/brands')
      .then((res) => {
        setListBrands(res.data);
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
          <Box sx={{ paddingBottom: '50px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingY: '20px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '50%',
                  margin: 'auto',
                  justifyContent: 'space-between',
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
                      value={editedProduct.name}
                      onChange={handleEditedProductChange}
                    />
                  </Box>
                  <Box sx={{ paddingY: '20px' }}>
                    <InputLabel
                      sx={{ fontSize: '20px', fontWeight: 'bold' }}
                      htmlFor="description"
                    >
                      Description
                    </InputLabel>
                    <TextField
                      sx={{ width: '300px' }}
                      id="description"
                      name="description"
                      value={editedProduct.description}
                      onChange={handleEditedProductChange}
                      multiline
                    />
                  </Box>
                  <Box sx={{ paddingY: '20px' }}>
                    <InputLabel
                      sx={{ fontSize: '20px', fontWeight: 'bold' }}
                      htmlFor="pricing"
                    >
                      Pricing
                    </InputLabel>
                    <Input
                      type="text"
                      sx={{ width: '300px' }}
                      id="pricing"
                      name="pricing"
                      value={editedProduct.pricing}
                      onChange={handleEditedProductChange}
                    />
                  </Box>
                  <Box sx={{ paddingY: '20px' }}>
                    <InputLabel
                      sx={{ fontSize: '20px', fontWeight: 'bold' }}
                      htmlFor="discount"
                    >
                      Discount
                    </InputLabel>
                    <Input
                      type="text"
                      sx={{ width: '300px' }}
                      id="discount"
                      name="discount"
                      value={editedProduct.discount}
                      onChange={handleEditedProductChange}
                    />
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ paddingY: '20px' }}>
                    <InputLabel
                      sx={{ fontSize: '20px', fontWeight: 'bold' }}
                      htmlFor="product-image-url"
                    >
                      Product Image Url
                    </InputLabel>
                    <TextField
                      sx={{ width: '300px' }}
                      id="product-image-url"
                      name="product_image_url"
                      value={editedProduct.product_image_url}
                      onChange={handleEditedProductChange}
                      multiline
                    />
                  </Box>
                  <Box sx={{ paddingY: '20px' }}>
                    <Box sx={{ width: 200 }}>
                      <FormControl fullWidth>
                        <InputLabel id="brand-label">Brand</InputLabel>
                        <Select
                          labelId="brand-label"
                          label="Brand"
                          value={
                            editedProduct.brand_name
                              ? editedProduct.brand_name
                              : ''
                          }
                          onChange={handleEditedProductChange}
                          name="brand_name"
                        >
                          {listBrands.map((brandItem) => {
                            return (
                              <MenuItem
                                value={brandItem.name}
                                key={brandItem.id}
                              >
                                {brandItem.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" onClick={handleEdit}>
                Edit
              </Button>
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
