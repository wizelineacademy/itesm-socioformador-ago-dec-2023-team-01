import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Box,
} from '@mui/material';

interface PopupProps {
  titleBlack: string;
  titleRed: string;
  content: string[]; // Change content properties to an array of strings
  badButtonTitle: string;
  goodButtonTitle: string;
  open: boolean;
  onClose: () => void;
  onGoodButtonClick: () => void;
}

export default function Popup({
  titleBlack,
  titleRed,
  content,
  badButtonTitle,
  goodButtonTitle,
  open,
  onClose,
  onGoodButtonClick,
}: PopupProps) {
  return (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>
      <Box borderRadius={16}>
        <DialogTitle style={{ textAlign: 'center' }}>
          <Typography variant="h6" style={{ color: 'black', display: 'inline' }}>
            {titleBlack}
          </Typography>
          <Typography variant="h6" style={{ color: '#E93D44', display: 'inline' }}>
            {titleRed}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content.map((text, index) => (
              <Typography
                variant="body1"
                key={index}
                style={{ color: index % 2 === 0 ? 'black' : '#E93D44', display: 'inline' }}
              >
                {text}
              </Typography>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <Box borderRadius={16}>
            <Button onClick={onClose} style={{ color: 'white', backgroundColor: '#E93D44' }}>
              {badButtonTitle}
            </Button>
          </Box>
          <Box borderRadius={16}>
            <Button onClick={onGoodButtonClick} style={{ color: 'white', backgroundColor: 'green' }}>
              {goodButtonTitle}
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
