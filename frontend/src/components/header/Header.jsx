import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import SearchInput from '../search-input/SearchInput';

function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        paddingY: '15px',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
      }}
    >
      <Box
        sx={{
          width: '20%',
          textAlign: 'center',
          paddingLeft: '30px',
        }}
      >
        <Link to="/">
          <img src="/images/header/logo.svg" alt="logo" />
        </Link>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '35%',
        }}
      >
        <Box
          sx={{ paddingX: '20px', borderRight: '2px solid rgb(227 226 226)' }}
        >
          <Link
            to="/products"
            style={{
              textDecoration: 'none',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            SẢN PHẨM
          </Link>
        </Box>
        <Box
          sx={{ paddingX: '20px', borderRight: '2px solid rgb(227 226 226)' }}
        >
          <Link
            to="/men"
            style={{
              textDecoration: 'none',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            NAM
          </Link>
        </Box>
        <Box
          sx={{ paddingX: '20px', borderRight: '2px solid rgb(227 226 226)' }}
        >
          <Link
            to="/women"
            style={{
              textDecoration: 'none',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            NỮ
          </Link>
        </Box>
        <Box sx={{ paddingX: '20px' }}>
          <Link
            to="/sale-off"
            style={{
              textDecoration: 'none',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            SALE OFF
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          width: '20%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <SearchInput />
      </Box>
    </Box>
  );
}

export default Header;
