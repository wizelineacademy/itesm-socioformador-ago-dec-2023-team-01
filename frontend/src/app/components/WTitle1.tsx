import React from 'react';
import { Typography } from '@mui/material';

interface Title1Props {
  text: String;
  redText: String;
  variantBig: Boolean;
  paddings: Boolean;
}

export default function WTitle1({
  text, redText, variantBig, paddings,
}:Title1Props) {
  return (
    <Typography
      {...variantBig ? { variant: 'h1' } : { variant: 'h3' }}
      sx={{
        color: 'white',
        fontWeight: 'bold',
        ...paddings ? { paddingTop: '4rem', paddingBottom: '3rem' } : {},
      }}
    >
      {text}
      <span>{redText}</span>
    </Typography>
  );
}
