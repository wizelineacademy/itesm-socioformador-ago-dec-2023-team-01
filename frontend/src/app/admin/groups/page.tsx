'use client';

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  TextField,
  Paper,
  Stack,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Group from '../components/group';
import Title from '../components/Title';
import CreateGroupPopup from '@/app/components/CreateGroupPopup';
import { AppDispatch } from '@/store';
import { fetchGroups } from '@/store/slices/groups';
import Awaiting from '@/app/components/awaiting';

export default function Groups() {
  const [search, setSearch] = useState('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { groupsInfo, isLoading } = useSelector((store:any) => store.groups);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  if (isLoading) {
    return <Awaiting />;
  }

  return (
    <Box>
      <CreateGroupPopup
        groupName=""
        defaultMonthlyWizecoins={100}
        open={isPopupOpen}
        onClose={handleClosePopup}
        onGoodButtonClick={handleClosePopup}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingRight="3.4rem"
      >
        <Title text="Groups." />
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
              label="Search groups"
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
              onClick={handleOpenPopup}
            >
              <AddIcon />
              New Group
            </Button>
          </Stack>
        </Paper>
      </Stack>
      <Grid container padding="3rem 0 3rem 3rem" gap={4}>
        {groupsInfo
          .filter((group:any) => (search.toLowerCase() === ''
            ? group
            : group.title.toLowerCase().includes(search)))
          .map((group:any, index:any) => (
            <Group key={index} {...group} />
          ))}
      </Grid>
    </Box>
  );
}
