import React from 'react';
import { Stack, CircularProgress, Container } from '@mui/material';

export default function Awaiting() {
  return (
    <Container>
      <Stack sx={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '50w',
        height: '50vh',
        overflow: 'hidden',
      }}
      >
        <CircularProgress size={100} color="error" />
      </Stack>
    </Container>
  );
}
