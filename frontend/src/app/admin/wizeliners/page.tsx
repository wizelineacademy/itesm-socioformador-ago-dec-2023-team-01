'use client';

import React, { useState, useEffect } from 'react';
import {
  Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button,
} from '@mui/material';
import Title from '../components/Title';
import { fetchWizeliners } from '@/services/wizelinerService';

export default function Wizeliners() {
  const [wizeliners, setWizeliners] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const wizelinersData = await fetchWizeliners();
        setWizeliners(wizelinersData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Title text="Wizeliners." />
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
              {wizeliners.map((user:any) => (
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
                      href="/admin/wizeliners/profile"
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
