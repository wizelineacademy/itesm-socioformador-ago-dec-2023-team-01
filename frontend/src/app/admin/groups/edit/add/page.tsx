'use client';

import React from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
} from '@mui/material';
import WTitle1 from '@/app/components/WTitle1';
import DataGridAdd from '@/app/admin/components/DataGridAdd';

export default function addWizeliner() {
  const groupName = 'Software Engineers';
  return (
    <Container>
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
        marginBottom={3}
      >
        <WTitle1 text="Edit" redText=" Groups" />
        <Paper
          sx={{
            marginTop: 1,
            padding: '10px',
            width: '100%',
            backgroundColor: '#111823',
            borderRadius: '20px',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Box display="flex" alignItems="center" marginLeft={1}>
            <Typography
              variant="h4"
              sx={{
                color: '#E93D44',
                fontWeight: 'bold',
              }}
            >
              {groupName}
            </Typography>
          </Box>
        </Paper>
      </Box>
      <DataGridAdd />
    </Container>
  );
}
