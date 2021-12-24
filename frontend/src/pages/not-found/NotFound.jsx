import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box sx={{ textAlign: 'center', paddingY: '100px' }}>
        <Box sx={{ fontWeight: 'bold', fontSize: '50px', paddingY: '50px' }}>
          404
        </Box>
        <Box sx={{ lineHeight: 1.5 }}>
          Sorry, we couldn&apos;t find this page. But don&apos;t worry, you can
          find
          <br /> plenty of other things on our{' '}
          <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
            homepage.
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default NotFound;
