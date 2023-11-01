import React from 'react';
import { Stack, CircularProgress } from '@mui/material';

export default function Awaiting() {
  return (
    <Stack sx={{
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    }}
    >
      <CircularProgress size={100} color="error" />
    </Stack>
  );
}
