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
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import { fetchUsers } from '@/services/usersService';
import Title from '../components/Title';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  imageUrl: string;
  email: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
  currentTokens: number;
  amountTokens: number;
}

export default function Wizeliners() {
  const [wizeliners, setWizeliners] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [filteredWizeliners, setFilteredWizeliners] = useState<User[]>([]);

  const router = useRouter();

  function capitalizeEachWord(input: string): string {
    return input.replace(/\b\p{L}[\p{L}'-]*\b/ug, (word) => {
      const firstChar = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);
      return firstChar + restOfWord;
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wizelinersData = await fetchUsers();
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
                <TableCell align="center" sx={{ color: '#FFF' }}>Full Name</TableCell>
                <TableCell align="center" sx={{ color: '#FFF' }}>Is Administrator</TableCell>
                <TableCell align="center" sx={{ color: '#FFF' }}>Wizecoins</TableCell>
                <TableCell align="center" sx={{ color: '#FFF' }}>Profile Information</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredWizeliners.map((wizeliner:any) => (
                <TableRow
                  key={wizeliner.fullName}
                  sx={{
                    '& td': { border: 2, borderColor: '#111823' },
                    '&:hover': {
                      backgroundColor: 'rgba(29, 41, 58, 0.2)',
                    },
                    color: '#FFF',
                  }}
                >
                  <TableCell sx={{ color: '#FFF' }}>{capitalizeEachWord(wizeliner.fullName)}</TableCell>
                  <TableCell align="center" sx={{ color: '#FFF' }}>
                    {wizeliner.isAdmin
                      ? (
                        <CheckBoxOutlinedIcon fontSize="large" sx={{ color: '#4BE93D' }} />
                      )
                      : (
                        <CropSquareIcon fontSize="large" sx={{ color: '#4BE93D' }} />
                      )}
                  </TableCell>
                  <TableCell align="center" sx={{ color: '#FFF' }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height="100%"
                      width="100%"
                      color="#4BE93D"
                    >
                      <Box
                        sx={{ marginRight: '5px' }}
                      >
                        <Image
                          src="/wizecoin.svg"
                          alt="Wizecoin Icon"
                          width={10}
                          height={10}
                          layout="fixed"
                        />
                      </Box>
                      <Box sx={{ color: '#f5f264', marginRight: '4px' }}>
                        {wizeliner.currentTokens}
                      </Box>
                      /
                      {' '}
                      {wizeliner.amountTokens}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => router.push(`wizeliners/edit?userId=${wizeliner.id}`)}
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
