import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Stack } from '@mui/material';

interface ButtonProps {
  text: String;
}

export default function TWButton({ text }: ButtonProps) {

  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        textTransform: 'none',
        bgcolor: 'white',
        color: 'black',
        fontWeight: 'bold',
        '&:hover': { bgcolor: 'gray', color: 'white' },
        padding: '0.7rem 2rem',
      }}
    >
      <GoogleIcon sx={{paddingRight: '10px'}}/>
      {text}
    </Button>
  );
}
