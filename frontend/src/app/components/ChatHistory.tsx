'use client';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import {
  Grid,
} from '@mui/material';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import ChatHistoryItem from './ChatHistoryItem';
import { AppDispatch } from '../redux/store';
import { resetUser } from '../redux/features/userSlice';

export default function ChatHistory({
  closeChatHistory,
  handleChatItemClick,
  chatHistory,
  getChatHistory,
  conversationId,
}:
{ closeChatHistory: () => void; handleChatItemClick: (id: number) => void; chatHistory: { title: string, id: number }[]; getChatHistory: () => Promise<void>; conversationId: number; }) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box
      height={{
        xs: '88vh',
      }}
      sx={{
        backgroundColor: '#111823',
        padding: '10px',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <IconButton color="inherit" onClick={closeChatHistory}>
          <CloseIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
      <Grid
        container
        justifyContent="space-between"
        spacing={1}
        marginBottom="10px"
      >
        <Grid item xs={12} lg={6}>
          <Button
            variant="outlined"
            startIcon={<AddIcon sx={{ color: 'white' }} />}
            onClick={() => {
              handleChatItemClick(0);
            }}
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              color: 'white',
              borderColor: '#4D545D',
              '&:hover': {
                borderColor: 'white',
              },
              '&.Mui-focused': {
                borderColor: 'white',
              },
              '& .MuiTouchRipple-root span': {
                backgroundColor: 'white',
              },
              width: '100%',
            }}
          >
            New Chat
          </Button>
        </Grid>
        <Grid
          xs={12}
          lg={6}
          item
        >
          <Link href="/api/auth/logout">
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                dispatch(resetUser());
              }}
              startIcon={<LogoutIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: '20px',
                width: '100%',
              }}
            >
              Logout
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        marginBottom="20px"
        color="error"
      >
        HISTORY
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '7px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4D545D',
            borderRadius: '10px',
            opacity: 0,
            transition: 'opacity 0.3s',
          },
          '&:hover::-webkit-scrollbar-thumb, &::-webkit-scrollbar-thumb:active':
            {
              opacity: 1,
            },
        }}
      >
        <Box sx={{ padding: '0 15px' }}>
          {chatHistory.map((chatInfo) => (
            <ChatHistoryItem
              chatInfo={chatInfo}
              handleChatItemClick={handleChatItemClick}
              getChatHistory={getChatHistory}
              conversationId={conversationId}
            />
          ))}
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" marginTop="20px">
        <Link href="/welcome">
          <Button
            variant="contained"
            color="error"
            sx={{
              borderRadius: '5px',
              textTransform: 'none',
            }}
          >
            Return Home
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
