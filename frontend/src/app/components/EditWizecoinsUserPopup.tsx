import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Box,
  Stack, TextField,
} from '@mui/material';

import { Inter } from 'next/font/google';
import styles from './iswelcome.module.css';

const inter = Inter({ subsets: ['latin'] });

interface PopupProps {
  fullName: string;
  monthlyWizecoins: string;
  open: boolean;
  onClose: () => void;
  onGoodButtonClick: () => void;
}

export default function EditWizecoinsUserPopup({
  fullName,
  monthlyWizecoins,
  open,
  onClose,
  onGoodButtonClick,
}: PopupProps) {
  const [monthlyWizecoinsInput, setMonthlyWizecoinsInput] = useState(monthlyWizecoins);

  const handleMonthlyWizecoinsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyWizecoinsInput(event.target.value);
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
              <span>change the amount of wizecoins</span>
              {' '}
              for
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
              onClick={onGoodButtonClick}
              style={{
                color: 'white',
                backgroundColor: '#4BE93D',
                borderRadius: '8px',
                textTransform: 'none',
                padding: '0px 12px',
              }}
              className={`${inter.className}`}
            >
              Change
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
