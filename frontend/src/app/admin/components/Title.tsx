import React from 'react';
import Typography from '@mui/material/Typography/Typography';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function Title(props:any) {
  const { text } = props;
  return (
    <Typography
      variant="h1"
      className={inter.className}
      sx={{
        paddingLeft: '3rem',
        fontWeight: 'bold',
        color: 'white',
      }}
    >
      {text}
    </Typography>
  );
}

export default Title;
