'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import WTitle1 from '@/app/components/WTitle1';
import DataGridAdd from '@/app/admin/components/DataGridAdd';

export default function AddWizeliner() {
  const router = useRouter();
  const params = useSearchParams();
  const groupName = 'Software Engineers';

  const handleNavBack = () => {
    router.back();
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={3}
      >
        <WTitle1 text="Add" redText=" Wizeliner" />
        <Paper
          sx={{
            marginTop: 0,
            padding: '10px',
            width: '100%',
            maxWidth: 400,
            backgroundColor: '#111823',
            borderRadius: '20px',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Box display="flex" justifyContent="center">
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
      <Box
        display="flex"
        justifyContent="space-between"
        marginTop={3}
      >
        <Button
          onClick={handleNavBack}
          variant="contained"
          color="error"
          sx={{
            bgcolor: '#E93D44',
            '&:hover': {
              bgcolor: 'red',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleNavBack}
          variant="contained"
          color="error"
          sx={{
            bgcolor: '#4BE93D',
            '&:hover': {
              bgcolor: 'green',
            },
          }}
        >
          Confirm
        </Button>
      </Box>
    </Container>
  );
}
