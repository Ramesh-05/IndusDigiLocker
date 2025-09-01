import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#2C4B72',
        color: '#FFFFFF',
        padding: '10px',
        textAlign: 'center',
        zIndex: 100000,
      }}
    >
      <Typography variant="body1" color="#FFFFFF">
        &copy; Copyright Orchasp Ltd 2024. All Rights Reserved. Powered By Orchasp
      </Typography>
    </Box>
  );
};

export default Footer;
