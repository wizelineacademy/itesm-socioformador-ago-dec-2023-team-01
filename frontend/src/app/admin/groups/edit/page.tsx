'use client';

import React from 'react';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import WTitle1 from '@/app/components/WTitle1';
import DataGrid from '@/app/admin/components/DataGrid';

export default function EditGroups() {
  const groupName = 'Software Engineers';
  const totalWizeliners = 150;
  const totalWizecoins = 5000;

  return (
    <Container>
      <WTitle1 text="Edit" redText="Groups" />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginY={2}
      >
        <Paper sx={{
          padding: '10px',
          width: '50%',
        }}
        >
          <Box display="flex" alignItems="center">
            <Typography variant="h5">{groupName}</Typography>
            <Box marginLeft={2}>
              <EditIcon style={{ cursor: 'pointer' }} />
              {' '}
            </Box>
          </Box>
        </Paper>
        <Box>
          <Typography variant="body1">
            Wizeliners:
            {totalWizeliners}
          </Typography>
          <Typography variant="body1">
            Wizecoins:
            {totalWizecoins}
          </Typography>
        </Box>
      </Box>
      <DataGrid />
    </Container>
  );
}
