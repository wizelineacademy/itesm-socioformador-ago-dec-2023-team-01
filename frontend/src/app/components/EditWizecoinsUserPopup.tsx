import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Box,
  Stack, TextField,
} from '@mui/material';
import { Inter } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import styles from './iswelcome.module.css';
import { AppDispatch, RootState } from '@/app/redux/store';
import { updateCurrentTokens } from '../redux/features/userSlice';

const inter = Inter({ subsets: ['latin'] });

interface PopupProps {
  fullName: string;
  monthlyWizecoins: string;
  open: boolean;
  onClose: () => void;
  onGoodButtonClick: (userId: string, operation: string, amount: number, jwtToken: string) => any;
  userId: string;
  setWizecoins: React.Dispatch<React.SetStateAction<string>>;
}

export default function EditWizecoinsUserPopup({
  fullName,
  monthlyWizecoins,
  open,
  onClose,
  onGoodButtonClick,
  userId,
  setWizecoins,
}: PopupProps) {
  const [monthlyWizecoinsInput, setMonthlyWizecoinsInput] = useState(monthlyWizecoins);

  const handleMonthlyWizecoinsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyWizecoinsInput(event.target.value);
  };

  const user = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch<AppDispatch>();

  const onClick = async () => {
    const newTokens = await onGoodButtonClick(userId, 'add', Number(monthlyWizecoinsInput), user?.jwtToken ?? '');
    dispatch(updateCurrentTokens(newTokens.currentAmountTokens));
  };

  return (
    <Dialog
      maxWidth="xs"
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
            variant="h5"
            style={{ fontWeight: 'bold', color: 'white', display: 'inline' }}
            className={`${inter.className}`}
          >
            Add
            {' '}
            <span>Wizecoins</span>
            .
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography
              variant="body1"
              style={{ color: 'white', display: 'inline' }}
              className={`${inter.className}`}
            >
              You are about to
              {' '}
              <span>add wizecoins </span>
              {' '}
              to
              {' '}
              <span>{fullName}</span>
              {' '}
              , proceed?
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
              <object data="/wizecoin.svg" className={styles.microimage} title="wizecoin" />
              <TextField
                value={monthlyWizecoinsInput}
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
                onChange={handleMonthlyWizecoinsChange}
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <Box>
            <Button
              onClick={onClose}
              style={{
                color: 'white',
                backgroundColor: '#E93D44',
                borderRadius: '8px', // Add the border radius to the button
                textTransform: 'none', // Set textTransform to 'none' to prevent all caps
                padding: '0px 12px',
              }}
              className={`${inter.className}`}
            >
              Cancel
            </Button>
          </Box>
          <Box>
            <Button
              onClick={() => {
                try {
                  if (monthlyWizecoinsInput === '' || Number(monthlyWizecoinsInput) <= 0) {
                    throw new Error('Invalid amount');
                  }
                  onClick();
                  setWizecoins((prev) => String(Number(prev) + Number(monthlyWizecoinsInput)));
                  onClose();
                } catch (error) {
                  console.error(error);
                }
              }}
              style={{
                color: 'white',
                backgroundColor: '#4BE93D',
                borderRadius: '8px',
                textTransform: 'none',
                padding: '0px 12px',
              }}
              className={`${inter.className}`}
            >
              Add
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
