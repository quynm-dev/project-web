import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import SearchInput from '../search-input/SearchInput';

function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        paddingY: '50px',
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
      <Box>
        <img src="/images/login/logo-ananas.svg" alt="logo ananas" />
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
