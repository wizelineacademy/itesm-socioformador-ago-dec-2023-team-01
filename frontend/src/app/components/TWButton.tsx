import React from 'react';
import { Button } from '@mui/material';

interface ButtonProps {
  text: String;
}

export default function WButton({ text }: ButtonProps) {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        bgcolor: 'white',
        color: 'gray',
        '&:hover': { bgcolor: 'gray', color: 'white' },
        padding: '0.7rem 2rem',
      }}
    >
      {text}
    </Button>
  );
}
