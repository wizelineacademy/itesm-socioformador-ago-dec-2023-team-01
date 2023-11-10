'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Title from '../components/Title';
import { fetchWizeliners } from '@/services/wizelinerService';

export default function Wizeliners() {
  const [wizeliners, setWizeliners] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredWizeliners, setFilteredWizeliners] = useState([]);

  const router = useRouter();
  const userId = 'google-oauth2|110273456643017657010';

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

  useEffect(() => {
    // eslint-disable-next-line max-len, @typescript-eslint/no-shadow
    const filteredWizeliners = wizeliners.filter((user: any) => user.fullName.toLowerCase().includes(search.toLowerCase()));
    setFilteredWizeliners(filteredWizeliners);
  }, [search, wizeliners]);
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingRight="3.4rem"
      >
        <Title text="Wizeliners" />
        <Paper
          elevation={8}
          sx={{
            width: '30rem',
            height: '4.5rem',
            borderRadius: '20px',
            bgcolor: '#111823',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            padding="0.5rem 1rem 0 1rem"
            color="white"
          >
            <SearchIcon sx={{ fontSize: '35px' }} />
            <TextField
              onChange={(e) => setSearch(e.target.value)}
              id="filled-search"
              label="Search Wizeliner"
              type="search"
              variant="filled"
              sx={{
                bgcolor: '#1D293A',
                borderRadius: '20px',
                width: '250px',
                input: {
                  color: 'white',
                },
                label: {
                  color: 'white',
                },
              }}
            />
            <Button
              variant="outlined"
              sx={{
                textTransform: 'none',
                color: 'white',
                borderColor: '#E93D44',
                borderRadius: '20px',
                '&:hover': { borderColor: 'red' },
              }}
            >
              <AddIcon />
              New Group
            </Button>
          </Stack>
        </Paper>
      </Stack>
      <Box sx={{ padding: '1rem 3rem 0 3rem' }}>
        <TableContainer component={Paper} sx={{ color: '#FFF', backgroundColor: '#1D293A' }}>
          <Table sx={{ minWidth: 650, color: '#FFF' }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#111823' }}>
                <TableCell sx={{ color: '#FFF' }}>Full Name</TableCell>
                <TableCell sx={{ color: '#FFF' }}>Area(s)</TableCell>
                <TableCell sx={{ color: '#FFF' }}>Is Administrator</TableCell>
                <TableCell sx={{ color: '#FFF' }}>Monthly Wizecoins</TableCell>
                <TableCell sx={{ color: '#FFF' }}>Profile Information</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredWizeliners.map((user:any) => (
                <TableRow
                  key={user.fullName}
                  sx={{
                    '& td': { border: 2, borderColor: '#111823' },
                    '&:hover': {
                      backgroundColor: 'rgba(29, 41, 58, 0.2)',
                    },
                    color: '#FFF',
                  }}
                >
                  <TableCell sx={{ color: '#FFF' }}>{user.fullName}</TableCell>
                  <TableCell sx={{ color: '#FFF' }}>{user.areas}</TableCell>
                  <TableCell sx={{ color: '#FFF' }}>{user.isAdmin ? 'YES' : 'NO'}</TableCell>
                  <TableCell sx={{ color: '#FFF' }}>{user.monthlyWizecoins}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => router.push(`wizeliners/edit?userId=${userId}`)}
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
