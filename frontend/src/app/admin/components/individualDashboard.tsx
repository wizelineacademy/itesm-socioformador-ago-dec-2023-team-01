'use client';

/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  Typography, Box, Button, Paper, Stack, Grid, IconButton, Avatar,
} from '@mui/material';
import { Inter } from 'next/font/google';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { useRouter } from 'next/navigation';
import { VariantType, enqueueSnackbar } from 'notistack';
import Popup from '@/app/components/Popup';
import EditWizecoinsUserPopup from '@/app/components/EditWizecoinsUserPopup';
import CreateTokenDialog from '@/app/admin/components/tokens/CreateTokenDialog';
import { updateUserAdminStatus } from '@/services/usersService';
import LineChart from './LineChart';
import styles from './individualDashboard.module.css';
import { createTokenForUser } from '@/services/tokenService';

const inter = Inter({ subsets: ['latin'] });

interface IndividualDashboardProps {
  id: string;
  name: string;
  userGroups: any;
  profileSrc: string;
  isAdmin: boolean;
  currentWizecoins: string;
  monthlyWizecoins: string;
  ChatGPTPrompts: string;
  GoogleBardPrompts: string;
  Llama2Prompts: string;
  stats: string[][];
  toggle: Function;
}

export default function UserProfileDashboard({
  id,
  name,
  userGroups,
  profileSrc,
  isAdmin,
  currentWizecoins,
  monthlyWizecoins,
  ChatGPTPrompts,
  GoogleBardPrompts,
  Llama2Prompts,
  stats,
  toggle,
}: IndividualDashboardProps) {
  const router = useRouter();
  const UserData = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ];

  const [userData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: 'Total tokens per year',
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          '#E93D44',
          '#E93D44',
          '#E93D44',
          '#E93D44',
          '#E93D44',
        ],
        borderColor: '#E93D44',
        borderWidth: 2,
      },
    ],
  });

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Total tokens per year', // Change to your desired title
        color: 'white', // Change the color of the title here
        font: {
          size: 16, // Adjust the font size if needed
        },
      },
      legend: {
        labels: {
          color: 'white', // Change the color of the dataset label here
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Change the color of the X-axis labels here
        },
        grid: {
          color: 'white', // Change the color of the X-axis grid lines here
        },
      },
      y: {
        ticks: {
          color: 'white', // Change the color of the Y-axis labels here
        },
        grid: {
          color: 'white', // Change the color of the Y-axis grid lines here
        },
      },
    },
  };

  const [isAdminPopupOpen, setAdminPopupOpen] = useState(false);
  const [isWizecoinsPopupOpen, setWizecoinsPopupOpen] = useState(false);
  const [isCreateTokensPopupOpen, setCreateTokensPopupOpen] = useState(false);
  const [wizecoins, setWizecoins] = useState(currentWizecoins);

  const showNotification = (variant: VariantType, user:string, action:string) => {
    enqueueSnackbar(`${action} ${user}`, { variant });
  };

  function capitalizeEachWord(input: string): string {
    return input.replace(/\b\p{L}[\p{L}'-]*\b/ug, (word) => {
      const firstChar = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);
      return firstChar + restOfWord;
    });
  }

  // Function to open the admin popup
  const handleOpenAdminPopup = () => {
    setAdminPopupOpen(true);
  };

  // Function to close the admin popup
  const handleCloseAdminPopup = () => {
    toggle();
    setAdminPopupOpen(false);
  };

  // Function to handle the "good" button click for admin popup
  const handleMakeAdminButtonClick = async () => {
    try {
      // Update the isAdmin status to true
      await updateUserAdminStatus(id, true);
    } catch (error) {
      console.error(error);
    }
    handleCloseAdminPopup();
    showNotification('success', capitalizeEachWord(name), 'Added');
  };

  // Function to handle the "good" button click for admin popup
  const handleRemoveAdminButtonClick = async () => {
    try {
      // Update the isAdmin status to false
      await updateUserAdminStatus(id, false);
    } catch (error) {
      console.error(error);
    }
    handleCloseAdminPopup();
    showNotification('error', capitalizeEachWord(name), 'Removed');
  };

  // Function to open the Wizecoins popup
  const handleOpenWizecoinsPopup = () => {
    setWizecoinsPopupOpen(true);
  };

  // Function to close the Wizecoins popup
  const handleCloseWizecoinsPopup = () => {
    toggle();
    setWizecoinsPopupOpen(false);
  };

  // Function to handle the "good" button click for Wizecoins popup
  const handleEditWizecoinsButtonClick = () => {
    try {
      // Your logic for handling "good" button click in the Wizecoins popup
    } catch (error) {
      console.error(error);
    }
    handleCloseWizecoinsPopup();
    showNotification('success', capitalizeEachWord(name), 'Wizecoins amount changed for ');
  };

  const handleReturn = () => {
    router.back();
  };

  const handleOpenCreateTokensPopUp = () => {
    setCreateTokensPopupOpen(true);
  };

  const handleCloseCreateTokensPopUp = () => {
    setCreateTokensPopupOpen(false);
  };

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'left', Height: '100vh', width: '100hh', paddingTop: '1.5rem',
    }}
    >
      <Stack sx={{
        display: 'flex', justifyContent: 'left', alignItems: 'left', Height: '100%', width: '100%', paddingLeft: '5rem', paddingRight: '5rem',
      }}
      >
        <Stack direction="row">
          <Stack direction="column" spacing="1rem">
            <Stack paddingLeft="1rem">
              <Avatar sx={{ height: '200px', width: '200px' }} alt="Wizeliner" src={profileSrc} />
            </Stack>
            <Stack direction="row" spacing="0.5rem">
              <Paper
                elevation={0}
                style={{
                  borderRadius: '15px', border: '1px solid grey', background: 'linear-gradient(#111823, #172339)', width: '150px',
                }}
              >
                <Stack direction="column" justifyContent="center" alignItems="center">
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 'bold', color: 'white' }}
                    className={`${inter.className}`}
                  >
                    Current Wizecoins
                  </Typography>
                  <Stack direction="row">
                    <object
                      data="/wizecoin.svg"
                      className={styles.microimage}
                      title="wizecoin"
                    />
                    <Typography variant="h6" sx={{ color: '#4BE93D' }} className={`${inter.className}`}>{wizecoins}</Typography>
                  </Stack>
                </Stack>
              </Paper>
              <Paper
                elevation={0}
                style={{
                  borderRadius: '15px', border: '1px solid grey', background: 'linear-gradient(#111823, #172339)', width: '70px',
                }}
              >
                <Stack direction="column" justifyContent="center" alignItems="center">
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 'bold', color: 'white' }}
                    className={`${inter.className}`}
                  >
                    Is admin
                  </Typography>
                  {isAdmin
                    ? (
                      <>
                        <IconButton type="button" onClick={handleOpenAdminPopup}>
                          <CheckBoxOutlinedIcon fontSize="large" sx={{ color: '#4BE93D' }} />
                        </IconButton>
                        <Popup
                          title={[
                            'Remove ',
                            'Administrator',
                            '.',
                          ]}
                          content={[
                            'You are about to ',
                            'remove',
                            ' ',
                            name,
                            ' ',
                            'as an Administrator',
                            ', proceed?',
                          ]}
                          badButtonTitle="Cancel"
                          goodButtonTitle="Remove"
                          open={isAdminPopupOpen}
                          onClose={handleCloseAdminPopup}
                          onGoodButtonClick={handleRemoveAdminButtonClick}
                        />

                      </>
                    )
                    : (
                      <>
                        <IconButton type="button" onClick={handleOpenAdminPopup}>
                          <CropSquareIcon fontSize="large" sx={{ color: '#4BE93D' }} />
                        </IconButton>
                        <Popup
                          title={[
                            'Create ',
                            'Administrator',
                            '.',
                          ]}
                          content={[
                            'You are about to ',
                            'make',
                            ' ',
                            capitalizeEachWord(name),
                            ' ',
                            'an Administrator',
                            ', proceed?',
                          ]}
                          badButtonTitle="Cancel"
                          goodButtonTitle="Create"
                          open={isAdminPopupOpen}
                          onClose={handleCloseAdminPopup}
                          onGoodButtonClick={handleMakeAdminButtonClick}
                        />

                      </>
                    )}
                </Stack>
              </Paper>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Box sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}
              >
                <Button
                  onClick={handleOpenCreateTokensPopUp}
                  style={{
                    color: 'white',
                    backgroundColor: '#E93D44',
                    borderRadius: '8px', // Add the border radius to the button
                    textTransform: 'none', // Set textTransform to 'none' to prevent all caps
                    padding: '0px 12px',
                  }}
                >
                  <Typography variant="body1" sx={{ color: 'white' }} className={`${inter.className}`}>Create Token</Typography>
                </Button>
                <CreateTokenDialog
                  title={['Create ', 'New Token']}
                  content={['You are creating a ', 'New Token, CAUTION! ', 'this will ', 'overwrite ', 'any existing token.']}
                  open={isCreateTokensPopupOpen}
                  handleClose={handleCloseCreateTokensPopUp}
                  handleCreate={createTokenForUser}
                  userId={id}
                  setWizecoins={setWizecoins}
                />
              </Box>
              <Box sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}
              >
                <Button
                  onClick={handleOpenWizecoinsPopup}
                  style={{
                    color: 'white',
                    backgroundColor: '#E93D44',
                    borderRadius: '8px', // Add the border radius to the button
                    textTransform: 'none', // Set textTransform to 'none' to prevent all caps
                    padding: '0px 12px',
                  }}
                >
                  <Typography variant="body1" sx={{ color: 'white' }} className={`${inter.className}`}>Edit</Typography>
                </Button>
                <EditWizecoinsUserPopup
                  fullName={capitalizeEachWord(name)}
                  monthlyWizecoins={monthlyWizecoins}
                  open={isWizecoinsPopupOpen}
                  onClose={handleCloseWizecoinsPopup}
                  onGoodButtonClick={handleEditWizecoinsButtonClick}
                />

              </Box>
            </Stack>
          </Stack>
          <Stack direction="column" paddingLeft="3rem">
            <Typography
              variant="h2"
              sx={{ fontWeight: 'bold', color: 'white' }}
              className={`${inter.className}`}
            >
              {capitalizeEachWord(name)}
            </Typography>
            <Stack direction="column" paddingTop="1rem">
              <Paper
                elevation={16}
                style={{
                  borderRadius: '20px', background: '#4F565F', width: '720px', height: '220px',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold', color: 'white', paddingLeft: '1rem', paddingTop: '0.25rem', paddingBottom: '0.25rem', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', background: '#111823',
                  }}
                  className={`${inter.className}`}
                >
                  Enrolled Groups
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="center"
                  padding="1rem"
                  spacing="0.5rem"
                >
                  <div
                    style={{
                      maxHeight: '150px',
                      overflow: 'auto',
                    }}
                  >
                    <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                      {userGroups.map((group:any) => (
                        <Grid item key={group.id}>
                          <Button
                            onClick={() => router.push(`/admin/groups/edit?id=${group.id}&groupTitle=${group.name}`)}
                            style={{
                              backgroundColor: '#1D293A',
                              borderRadius: '15px',
                              textTransform: 'none',
                              padding: '6px',
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#E93D44',
                                fontWeight: 'bold',
                                paddingLeft: '8px',
                                paddingRight: '8px',
                              }}
                              className={`${inter.className}`}
                            >
                              {group.name}
                            </Typography>
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </Stack>

              </Paper>

            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" paddingBottom="1rem" paddingTop="1.5rem" spacing="1.5rem">
          <Paper
            elevation={16}
            style={{
              height: '200px', width: '450px', borderRadius: '20px', background: '#102A43',
            }}
          >
            <LineChart data={userData} options={options} />
          </Paper>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Paper
              elevation={16}
              style={{
                borderRadius: '20px', background: '#4F565F', height: '200px', width: '250px',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold', color: 'white', paddingLeft: '4rem', paddingTop: '0.25rem', paddingBottom: '0.25rem', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', background: '#111823',
                }}
                className={`${inter.className}`}
              >
                LLMs utilizados
              </Typography>
              <Stack direction="column" justifyContent="left" alignItems="center" padding="1rem" spacing="1rem">
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    color: 'white', fontWeight: 'bold', backgroundColor: '#1D293A', width: '200px', borderRadius: '15px', textTransform: 'none', padding: '6px', align: 'center',
                  }}
                  className={`${inter.className}`}
                >
                  Chat-GPT |
                  { ' ' }
                  { ' ' }
                  {ChatGPTPrompts}
                  { ' ' }
                  prompts
                </Typography>

                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    color: 'white', fontWeight: 'bold', backgroundColor: '#1D293A', width: '200px', borderRadius: '15px', textTransform: 'none', padding: '6px', align: 'center',
                  }}
                  className={`${inter.className}`}
                >
                  Google Bard |
                  { ' ' }
                  { ' ' }
                  {GoogleBardPrompts}
                  { ' ' }
                  prompts
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    color: 'white', fontWeight: 'bold', backgroundColor: '#1D293A', width: '200px', borderRadius: '15px', textTransform: 'none', padding: '6px', align: 'center',
                  }}
                  className={`${inter.className}`}
                >
                  Llama 2 |
                  { ' ' }
                  { ' ' }
                  {Llama2Prompts}
                  { ' ' }
                  prompts
                </Typography>
              </Stack>
            </Paper>
          </Stack>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Paper
              elevation={16}
              style={{
                borderRadius: '20px', background: '#4F565F', height: '200px', width: '250px',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold', color: 'white', paddingLeft: '2.25rem', paddingTop: '0.25rem', paddingBottom: '0.25rem', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', background: '#111823',
                }}
                className={`${inter.className}`}
              >
                Average time per page
              </Typography>
              <Stack
                direction="column"
                justifyContent="left"
                alignItems="center"
                padding="1rem"
                spacing="0.5rem"
              >
                <div
                  style={{
                    maxHeight: '140px',
                    overflow: 'auto',
                  }}
                >
                  <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                    {stats.map((area, index) => (
                      <Grid item key={index}>
                        <Button
                          key={index}
                          href="/mainpage"
                          style={{
                            backgroundColor: '#1D293A',
                            width: '200px',
                            borderRadius: '15px', // Add the border radius to the button
                            textTransform: 'none', // Set textTransform to 'none' to prevent all caps
                            padding: '6px',
                          }}
                        >
                          <Stack direction="row" display="flex" justifyContent="space-between" alignItems="left" spacing="1rem">
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'white', fontWeight: 'bold',
                              }}
                              className={`${inter.className}`}
                            >
                              {area[0]}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'white', fontWeight: 'bold',
                              }}
                              className={`${inter.className}`}
                            >
                              {area[1]}
                              { ' ' }
                              hrs
                            </Typography>
                          </Stack>
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </Stack>
            </Paper>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" paddingBottom="1rem" paddingTop="1rem" width="100%">
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}
          >
            <Button
              onClick={handleReturn}
              style={{
                color: 'white',
                backgroundColor: '#E93D44',
                borderRadius: '8px', // Add the border radius to the button
                textTransform: 'none', // Set textTransform to 'none' to prevent all caps
                padding: '0px 20px',
              }}
            >
              <Typography variant="h6" sx={{ color: 'white' }} className={`${inter.className}`}>Return</Typography>
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
