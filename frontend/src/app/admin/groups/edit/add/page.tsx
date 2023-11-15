'use client';

import React from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { Inter } from 'next/font/google';
import { useRouter, useSearchParams } from 'next/navigation';
import DataGridAdd from '@/app/admin/components/DataGridAdd';

const inter = Inter({ subsets: ['latin'] });

export default function AddWizeliner() {
  const router = useRouter();
  const params = useSearchParams();
  const title = params.get('groupTitle');
  const groupId = params.get('id');
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
        {/* <WTitle1 text="Add" redText=" Wizeliner" /> */}
        <Stack direction="row" spacing={0}>
          <Typography
            variant="h1"
            className={inter.className}
            sx={{
              fontWeight: 'bold',
              color: '#e93d44',
            }}
          >
            Add
          </Typography>
          <Typography
            variant="h1"
            className={inter.className}
            sx={{
              paddingLeft: '2rem',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Wizeliner.
          </Typography>
        </Stack>
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
              {title}
            </Typography>
          </Box>
        </Paper>
      </Box>
      <DataGridAdd groupId={groupId!} />
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
          Go Back
        </Button>
      </Box>
    </Container>
  );
}
