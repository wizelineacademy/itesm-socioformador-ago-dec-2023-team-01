'use client';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, TextField,
} from '@mui/material';
import { getHistory } from '@/services/usersService';
import ChatHistoryItem from './ChatHistoryItem';

export default function ChatHistory({
  closeChatHistory,
  handleChatItemClick,
  chatHistory,
  getChatHistory,
  conversationId,
}:
{ closeChatHistory: () => void; handleChatItemClick: (id: number) => void; chatHistory: { title: string, id: number }[]; getChatHistory: () => Promise<void>; conversationId: number; }) {
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
        justifyContent="space-between"
        alignItems="center"
        marginBottom="10px"
      >
        <Box display="flex" alignItems="center">
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
            }}
          >
            New Chat
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          <IconButton color="inherit" onClick={closeChatHistory}>
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>

        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          sx={{
            textTransform: 'none',
            borderRadius: '20px',
          }}
        >
          Logout
        </Button>
      </Box>

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
        <Button
          href="/welcome"
          variant="contained"
          color="error"
          sx={{
            borderRadius: '5px',
            textTransform: 'none',
          }}
        >
          Return Home
        </Button>
      </Box>
    </Box>
  );
}
