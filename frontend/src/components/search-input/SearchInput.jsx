import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
  const [productName, setProductName] = useState('');
  const navigate = useNavigate();

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSearch = () => {
    if (productName) {
      navigate(`/search?product-name=${productName}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <Box>
      <TextField
        variant="outlined"
        placeholder="Tìm kiếm sản phẩm"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onBlur={handleSearch}
        onChange={handleProductNameChange}
      />
    </Box>
  );
}

export default SearchInput;
