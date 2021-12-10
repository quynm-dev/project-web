import React from 'react';
import { Box } from '@mui/material';
import { PropTypes } from 'prop-types';

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
        return <Box sx={{ paddingY: '5px', color: '#c4c4c4' }}>{item}</Box>;
      })}
    </Box>
  );
}

FooterColumn.propTypes = {
  title: PropTypes.element.isRequired,
  items: PropTypes.element.isRequired,
};

export default FooterColumn;
