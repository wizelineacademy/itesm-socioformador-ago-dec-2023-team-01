'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Link from 'next/link';
import ChatHistoryItem from '@/app/components/ChatHistoryItem';

export default function SideNavbar({
  handleChatItemClick,
  chatHistory,
  getChatHistory,
  conversationId,
}:
{ handleChatItemClick: (id: number) => void; chatHistory: { title: string, id: number }[]; getChatHistory: () => Promise<void>; conversationId: number; }) {
  return (
    <Stack
      sx={{ backgroundColor: '#111823', width: '18rem', height: '100%' }}
      justifyContent="space-between"
    >
      <Box>
        <Stack justifyContent="center" alignItems="center" padding="1rem 0 1rem 0">
          <Button
            variant="outlined"
            onClick={() => {
              handleChatItemClick(0);
            }}
            sx={{
              justifyContent: 'space-between',
              textTransform: 'none',
              borderRadius: '7px',
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
              width: '75%',
            }}
          >
            <Typography>Create a new chat</Typography>
            <EditNoteIcon />
          </Button>
          <Typography color="white" variant="h5" fontWeight="bold" paddingTop="15px">
            <span>
              HISTORY
            </span>
          </Typography>
        </Stack>
        <Stack alignItems="center">
          <Box
            overflow="scroll"
            maxHeight="70vh"
            maxWidth="230px"
            padding="0 15px"
          >
            {chatHistory.map((chatInfo) => (
              <ChatHistoryItem
                chatInfo={chatInfo}
                handleChatItemClick={handleChatItemClick}
                getChatHistory={getChatHistory}
                conversationId={conversationId}
              />
            ))}
          </Box>
        </Stack>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingBottom="2rem"
      >
        <Link href="/welcome">
          <Button
            variant="contained"
            sx={{
              bgcolor: '#E93D44',
              '&:hover': { bgcolor: 'red' },
            }}
          >
            Return Home
          </Button>
        </Link>
      </Box>
    </Stack>
  );
}
