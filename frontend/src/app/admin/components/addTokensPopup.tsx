import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
  TextField,
  Stack,
} from '@mui/material';
import { VariantType, enqueueSnackbar } from 'notistack';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { addTokensToUsersInGroup } from '@/services/tokenService';

const inter = Inter({ subsets: ['latin'] });

interface AddTokenProps {
  title: string[]; // Change title properties to an array of strings
  content: string[]; // Change content properties to an array of strings
  badButtonTitle: string;
  goodButtonTitle: string;
  open: boolean;
  groupId: string,
  onClose: () => void;
  onGoodButtonClick: () => void;
}

export default function AddTokensPopup({
  title,
  content,
  badButtonTitle,
  goodButtonTitle,
  open,
  onClose,
  groupId,
  onGoodButtonClick,
}: AddTokenProps) {
  const [tokens, setTokens] = useState(0);

  const showNotification = (variant: VariantType, text:string, action:string) => {
    enqueueSnackbar(`${action} ${text}`, { variant });
  };

  const handleChangeTokens = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = Number(event.target.value);
    if (!Number.isNaN(userInput)) {
      setTokens(userInput);
      console.log(userInput);
    }
  };

  const handleaddTokensClick = async () => {
    try {
      await addTokensToUsersInGroup(groupId, tokens);
      showNotification('success', 'tokens to everyone in this group', 'Added ');
      onGoodButtonClick();
    } catch (error) {
      console.log(error);
    }
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
          {title.map((text, index) => (
            <React.Fragment key={index}>
              <Typography
                variant="h5"
                style={{ fontWeight: 'bold', color: index % 2 === 0 ? 'white' : '#E93D44', display: 'inline' }}
                className={`${inter.className}`}
              >
                {text}
              </Typography>
            </React.Fragment>
          ))}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content.map((text, index) => (
              <React.Fragment key={index}>
                <Typography
                  variant="body1"
                  style={{ color: index % 2 === 0 ? 'white' : '#E93D44', display: 'inline' }}
                  className={`${inter.className}`}
                >
                  {text}
                </Typography>
              </React.Fragment>
            ))}
          </DialogContentText>
        </DialogContent>
        <Stack alignItems="center" justifyContent="center">
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
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box sx={{ paddingLeft: '1rem' }}>
                <Image
                  src="/wizecoin.svg"
                  alt="Wizecoin Icon"
                  width={18}
                  height={18}
                  layout="fixed"
                />
              </Box>
              <TextField
                value={tokens}
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
                onChange={handleChangeTokens}
              />
            </Stack>
          </Box>
        </Stack>
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
              {badButtonTitle}
            </Button>
          </Box>
          <Box>
            <Button
              onClick={handleaddTokensClick}
              style={{
                color: 'white',
                backgroundColor: '#4BE93D',
                borderRadius: '8px', // Add the border radius to the button
                textTransform: 'none', // Set textTransform to 'none' to prevent all caps
                padding: '0px 12px',
              }}
              className={`${inter.className}`}
            >
              {goodButtonTitle}
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
