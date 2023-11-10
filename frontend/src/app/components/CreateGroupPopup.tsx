import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Box,
  Stack, TextField,
} from '@mui/material';
import { Inter } from 'next/font/google';
import styles from './iswelcome.module.css';
import { createGroup } from '@/services/groupService';

const inter = Inter({ subsets: ['latin'] });

interface CreateGroupPopupProps {
  groupName: string;
  defaultMonthlyWizecoins: number;
  open: boolean;
  onClose: () => void;
  onGoodButtonClick: () => void;
}

export default function CreateGroupPopup({
  groupName,
  defaultMonthlyWizecoins,
  open,
  onClose,
  onGoodButtonClick,
}: CreateGroupPopupProps) {
  const [groupNameInput, setGroupNameInput] = useState(groupName);
  // eslint-disable-next-line max-len
  const [defaultMonthlyWizecoinsInput, setDefaultMonthlyWizecoinsInput] = useState(defaultMonthlyWizecoins);

  const handleGroupNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupNameInput(event.target.value);
  };

  const handleDefaultMonthlyWizecoinsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultMonthlyWizecoinsInput(Number(event.target.value));
  };

  const handleCreateClick = () => {
    createGroup(groupNameInput);
    onGoodButtonClick();
  };

  return (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '20px', background: 'linear-gradient(#343541, #172339)',
        },
      }}
    >
      <Box>
        <DialogTitle style={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: 'white' }}
            className={`${inter.className}`}
          >
            Create
            {' '}
            <span>Group</span>
            .
          </Typography>
        </DialogTitle>
        <DialogContent>

          <Box sx={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
          }}
          >
            <Stack direction="column" justifyContent="space-between" alignItems="left" spacing={4}>
              <Stack direction="column" justifyContent="space-between" alignItems="left" spacing={0.5}>
                <DialogContentText style={{ justifyContent: 'left', alignItems: 'left' }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: 'white' }}
                    className={`${inter.className}`}
                  >
                    Group
                    {' '}
                    <span>Name</span>
                  </Typography>
                </DialogContentText>
                <TextField
                  className={`${inter.className}`}
                  value={groupNameInput}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: {
                      color: 'white',
                      border: '2px solid grey',
                      borderRadius: '25px',
                      height: '40px',
                      width: '500px',
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'transparent', // sin enfoque
                      },
                      '&:hover fieldset': {
                        borderColor: 'transparent', // por encima
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'transparent', // enfocado
                      },
                    },
                  }}
                  InputLabelProps={{ style: { color: 'white' } }}
                  onChange={handleGroupNameChange}
                />
              </Stack>
              <Stack direction="column" justifyContent="space-between" alignItems="left" spacing={0.5}>
                <DialogContentText style={{ justifyContent: 'left', alignItems: 'left' }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: 'white' }}
                    className={`${inter.className}`}
                  >
                    Default Monthly Wize
                    <span>coins</span>
                  </Typography>
                </DialogContentText>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  border: '2px solid grey',
                  borderRadius: '25px',
                  margin: '0 10px',
                  width: '185px',
                  height: '40px',
                }}
                >
                  <Stack direction="row" alignItems="left" marginTop="0.25rem" marginLeft="1rem">
                    <object data="./wizecoin.svg" className={styles.microimage} title="wizecoin" />
                    <TextField
                      value={defaultMonthlyWizecoinsInput}
                      className={`${inter.className}`}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        style: {
                          color: '#4BE93D',
                          marginLeft: '0rem',
                          margin: '0rem',
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'transparent', // sin enfoque
                          },
                          '&:hover fieldset': {
                            borderColor: 'transparent', // por encima
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'transparent', // enfocado
                          },
                        },
                      }}
                      InputLabelProps={{ style: { color: 'white' } }}
                      onChange={handleDefaultMonthlyWizecoinsChange}
                    />
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </Box>

        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', margin: '0.5rem' }}>
          <Box>
            <Button
              onClick={onClose}
              style={{
                color: 'white',
                backgroundColor: '#E93D44',
                borderRadius: '8px',
                textTransform: 'none',
                padding: '0px 12px',
              }}
              className={`${inter.className}`}
            >
              Cancel
            </Button>
          </Box>
          <Box>
            <Button
              onClick={handleCreateClick}
              style={{
                color: 'white',
                backgroundColor: '#4BE93D',
                borderRadius: '8px',
                textTransform: 'none',
                padding: '0px 12px',
              }}
              className={`${inter.className}`}
            >
              Create
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
