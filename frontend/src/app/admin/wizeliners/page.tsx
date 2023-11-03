'use client';

import React, { useEffect } from 'react';
import { Inter } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchUsers } from '@/store/slices/users';
import { AppDispatch } from '@/store';

const inter = Inter({ subsets: ['latin'] });

export default function Wizeliners() {
  const { usersInfo } = useSelector((store:any) => store.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <Typography
        variant="h1"
        className={inter.className}
        sx={{
          paddingLeft: '3rem',
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        Wizeliners.
      </Typography>
      <Box sx={{ padding: '1rem 3rem 0 3rem' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Area(s)</TableCell>
                <TableCell>Is Administrator</TableCell>
                <TableCell>Monthly Wizecoins</TableCell>
                <TableCell>Profile Information</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersInfo.map((user:any) => (
                <TableRow
                  key={user.fullName}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.areas}</TableCell>
                  <TableCell>{user.isAdmin ? 'YES' : 'NO'}</TableCell>
                  <TableCell>{user.monthlyWizecoins}</TableCell>
                  <TableCell>
                    <Button
                      href="/welcome"
                      variant="contained"
                      color="error"
                      sx={{
                        borderRadius: '5px',
                        textTransform: 'none',
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
