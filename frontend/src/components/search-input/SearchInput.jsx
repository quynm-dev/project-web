import { Box, Input } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

function SearchInput() {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        border: '1px solid black',
        alignItems: 'center',
        paddingX: '5px',
      }}
    >
      <Box sx={{ paddingRight: '5px' }}>
        <SearchIcon sx={{ position: 'relative', top: '2px' }} />
      </Box>
      <Box>
        <Input placeholder="Tìm kiếm" />
      </Box>
    </Box>
  );
}

export default SearchInput;
