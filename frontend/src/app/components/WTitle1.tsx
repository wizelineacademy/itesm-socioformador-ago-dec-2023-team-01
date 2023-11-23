import React from 'react';
import { Typography } from '@mui/material';

interface Title1Props {
  text: String;
  redText: String;
}

export default function WTitle1({ text, redText }: Title1Props) {
  return (
    <Typography
      variant="h3"
      sx={{
        color: 'white',
        fontWeight: 'bold',
        // paddingTop: '4rem',
        // paddingBottom: '3rem',
      }}
    >
      {text}
      <span>{redText}</span>
    </Typography>
  );
}
