import React from 'react';
import { Box } from '@mui/material';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

function FooterColumn({ title, items }) {
  return (
    <Box sx={{ width: '20%' }}>
      <Box
        sx={{
          fontSize: '20px',
          paddingY: '15px',
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        {title.toUpperCase()}
      </Box>
      {items.map((item) => {
        return (
          <Box sx={{ paddingY: '5px', color: '#c4c4c4' }} key={item}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              {item}
            </Link>
          </Box>
        );
      })}
    </Box>
  );
}

FooterColumn.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
};

FooterColumn.defaultProps = {
  title: '',
  items: [],
};

export default FooterColumn;
