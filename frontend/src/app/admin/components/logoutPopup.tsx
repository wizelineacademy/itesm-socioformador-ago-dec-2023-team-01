import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Box,
} from '@mui/material';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface PopupProps {
  title: string[]; // Change title properties to an array of strings
  content: string[]; // Change content properties to an array of strings
  badButtonTitle: string;
  goodButtonTitle: string;
  open: boolean;
  onClose: () => void;
  onGoodButtonClick: () => void;
}

export default function LogoutPopup({
  title,
  content,
  badButtonTitle,
  goodButtonTitle,
  open,
  onClose,
  onGoodButtonClick,
}: PopupProps) {
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
              href="/api/auth/logout"
              onClick={onGoodButtonClick}
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
