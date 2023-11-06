'use client';

import React from 'react';
import { Box, Stack } from '@mui/material';
import Title from './components/Title';

export default function Admin() {
  return (
    <Box>
      <Title text="Dashboard." />
      <Stack>
        <p>Hello everyone</p>
      </Stack>
    </Box>
  );
}
