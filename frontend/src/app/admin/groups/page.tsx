'use client';

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  TextField,
  Paper,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { Inter } from 'next/font/google';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Group from '../components/group';
import { fetchGroups } from '@/services/groupService';
import CreateGroupPopup from '@/app/components/CreateGroupPopup';

const inter = Inter({ subsets: ['latin'] });

export default function Groups() {
  const [search, setSearch] = useState('');
  const [change, setChange] = useState(true);
  const [groups, setGroups] = useState([]);
  const [isCreatePopupOpen, setCreatePopup] = useState(false);

  const handleOpenCreatePopup = () => {
    setCreatePopup(true);
  };

  const handleCloseCreatePopup = () => {
    // this needs to change - test only
    setChange(!change);
    setCreatePopup(false);
  };

  const handleRefetch = () => {
    setChange((prevValue) => !prevValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupsData = await fetchGroups();
        console.log(groupsData);
        setGroups(groupsData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [change]);

  return (
    <Box>
      <CreateGroupPopup
        groupName=""
        defaultMonthlyWizecoins={100}
        open={isCreatePopupOpen}
        onClose={handleCloseCreatePopup}
        onGoodButtonClick={handleCloseCreatePopup}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingRight="3.4rem"
      >
        <Typography
          variant="h1"
          className={inter.className}
          sx={{
            paddingLeft: '3rem',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Groups.
        </Typography>
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
              onClick={handleOpenCreatePopup}
            >
              <AddIcon />
              New Group
            </Button>
          </Stack>
        </Paper>
      </Stack>
      <Grid container padding="3rem 0 3rem 3rem" gap={4}>
        {groups
          .filter((group : any) => (search.toLocaleLowerCase() === ''
            ? group
            : group.title.toLocaleLowerCase().includes(search)))
          .map((group : any, index) => (
            <Group
              key={index}
              id={group.id}
              title={group.title}
              members={group.members}
              moneySpent={group.moneySpent}
              data={group.data}
              toggle={handleRefetch}
            />
          ))}
      </Grid>
    </Box>
  );
}
