'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { SnackbarProvider } from 'notistack';
import DataGrid from '@/app/admin/components/DataGrid';
import AddTokensPopup from '../../components/addTokensPopup';

const inter = Inter({ subsets: ['latin'] });

export default function EditGroups() {
  const params = useSearchParams();
  const title = params.get('groupTitle');
  const id = params.get('id');
  const [groupName, setGroupName] = useState('Software Engineers');
  const [isEditing, setIsEditing] = useState(false);
  const [wizeCount, setWizeCount] = useState({ totalFinalWizeCoins: 0, totalWizeCoins: 0, totalUsers: 0 });
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const router = useRouter();

  const handleGroupNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setGroupName(e.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleNavBack = () => {
    router.back();
  };

  const handleWizeCount = (wizeCountData:{ totalFinalWizeCoins: number, totalWizeCoins:number, totalUsers:number }) => {
    console.log(wizeCountData);
    setWizeCount(wizeCountData);
  };

  const handleNavigation = () => {
    const groupId = id;
    const searchParams = new URLSearchParams();
    searchParams.append('id', groupId!.toString());
    searchParams.append('groupTitle', title!.toString());
    router.push(`/admin/groups/edit/add?${searchParams.toString()}`);
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleGoodButtonClick = () => {
    setTriggerFetch((prevState) => !prevState);
    setPopupOpen(false);
  };

  return (
    <Container>
      <SnackbarProvider />
      <AddTokensPopup
        title={['Add Wizecoins', ' to group']}
        content={['This action adds the amount of wizecoins you specify', ' to everyone in this group.', ' please type the number in correctly before you set it.']}
        badButtonTitle="Cancel"
        goodButtonTitle="Add Wizecoins"
        open={isPopupOpen}
        groupId={id!}
        onClose={handleClosePopup}
        onGoodButtonClick={handleGoodButtonClick}
      />
      <Box marginBottom={2}>
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Box>
            <Stack direction="row" spacing={0}>
              <Typography
                variant="h1"
                className={inter.className}
                sx={{
                  fontWeight: 'bold',
                  color: '#e93d44',
                  padding: '0',
                }}
              >
                Edit
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
                Group.
              </Typography>
            </Stack>
            <Paper
              sx={{
                marginTop: 1,
                padding: '10px',
                maxidth: '100%',
                backgroundColor: '#111823',
                borderRadius: '20px',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Box display="flex" alignItems="center" marginLeft={1}>
                {isEditing ? (
                  <input
                    value={groupName}
                    onChange={handleGroupNameChange}
                    onBlur={toggleEditing}
                  />
                ) : (
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#E93D44',
                      fontWeight: 'bold',
                    }}
                  >
                    {title}
                  </Typography>
                )}
              </Box>
            </Paper>
          </Box>

          <Paper
            sx={{
              padding: '10px',
              width: '30%',
              backgroundColor: '#111823',
              borderRadius: '20px',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom={2}
            >
              {/* Finish and go back */}
              <Button
                onClick={handleNavBack}
                variant="contained"
                sx={{
                  textTransform: 'none',
                  fontSize: '1rem',
                  bgcolor: '#E93D44',
                  '&:hover': {
                    bgcolor: 'red',
                  },
                }}
              >
                Finish and go back
              </Button>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={1}
              marginRight={1}
            >
              <Tooltip title="Total Amount of Wizeliners">
                <Box
                  sx={{
                    width: '50%',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid #4D545D',
                    borderRadius: '10px',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#ffffff',
                    }}
                  >
                    {wizeCount.totalUsers}
                  </Typography>
                </Box>
              </Tooltip>
              {/* New member */}
              <Button
                onClick={handleNavigation}
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  color: '#ffffff',
                  borderColor: '#4BE93D',
                  borderRadius: '20px',
                  '&:hover': {
                    borderColor: 'green',
                  },
                  '& .MuiTouchRipple-root span': {
                    backgroundColor: '#4BE93D',
                  },
                }}
              >
                <AddIcon />
                Add Wizeliners
              </Button>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginRight={1}
            >
              {/* Total Wizecoins */}
              <Tooltip title="Total ammount of wizecoins">
                <Box
                  sx={{
                    width: '50%',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid #4D545D',
                    borderRadius: '10px',
                  }}
                >
                  <Box
                    sx={{
                      marginRight: '5px',
                    }}
                  >
                    <Image
                      src="/wizecoin.svg"
                      alt="Wizecoin Icon"
                      width={12}
                      height={12}
                      layout="fixed"
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#f5f264',
                    }}
                  >
                    {wizeCount.totalWizeCoins}
                  </Typography>
                </Box>
              </Tooltip>
              <Typography
                variant="body1"
                sx={{
                  color: 'white',
                }}
              >
                Current Wizecoins
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginRight={1}
              marginTop={1}
            >
              {/* Total Wizecoins */}
              <Tooltip title="Total ammount of wizecoins">
                <Box
                  sx={{
                    width: '50%',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid #4D545D',
                    borderRadius: '10px',
                  }}
                >
                  <Box
                    sx={{
                      marginRight: '5px',
                    }}
                  >
                    <Image
                      src="/wizecoin.svg"
                      alt="Wizecoin Icon"
                      width={12}
                      height={12}
                      layout="fixed"
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#4BE93D',
                    }}
                  >
                    {wizeCount.totalFinalWizeCoins}
                  </Typography>
                </Box>
              </Tooltip>
              {/* BEFORE: Wizecoins */}
              {/* Add Wizecoins */}
              <Button
                onClick={handleOpenPopup}
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  color: '#ffffff',
                  borderColor: '#d305ff',
                  borderRadius: '20px',
                  '&:hover': {
                    borderColor: 'purple',
                  },
                  '& .MuiTouchRipple-root span': {
                    backgroundColor: '#d305ff',
                  },
                }}
              >
                <AddIcon />
                Add Wizecoins
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
      <DataGrid groupId={id!} wizeCount={handleWizeCount} triggerFetch={triggerFetch} />
    </Container>
  );
}
