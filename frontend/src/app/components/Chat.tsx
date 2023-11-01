'use client';

import React from 'react';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

export default function Chat({ profileSrc }:any) {
  const messages = [
    { from: 'user', text: 'Hello ChatGPT!' },
    { from: 'chatgpt', text: 'Hello! How can I assist you today?' },
    { from: 'user', text: 'Lorem ipsum?' },
    {
      from: 'chatgpt',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    { from: 'user', text: 'Pero si es Lorem Ipsum?' },
    {
      from: 'chatgpt',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '71.5vh',
        background: 'linear-gradient(to bottom, #4D545D, #4F565F, transparent)',
        borderRadius: '20px',
      }}
    >
      {/* Chat Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          ChatGPT 4.0
        </Typography>
      </Box>

      {/* Chat */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'scroll',
          padding: '10px',
          backgroundColor: 'transparent',
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent:
                message.from === 'chatgpt' ? 'flex-start' : 'flex-end',
              marginBottom: '10px',
            }}
          >
            {message.from === 'chatgpt' && (
              <Avatar
                alt="ChatGPT Picture"
                src="./chatchat.png"
                sx={{
                  width: 40,
                  height: 40,
                  marginRight: '10px',
                }}
              />
            )}
            <Typography
              variant="body1"
              style={{
                padding: '10px',
                borderRadius: '20px',
                background: message.from === 'chatgpt' ? '#0E8265' : '#111823',
                color: 'white',
              }}
            >
              {message.text}
            </Typography>
            {message.from === 'user' && (
              <Avatar
                alt="User Picture"
                src={profileSrc}
                sx={{
                  width: 40,
                  height: 40,
                  marginLeft: '10px',
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Chat Input */}
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          position: 'sticky',
          bottom: 0,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#4E555E', // sin enfoque
              },
              '&:hover fieldset': {
                borderColor: 'white', // por encima
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', // enfocado
              },
            },
          }}
          InputProps={{
            style: {
              borderRadius: '20px',
              borderColor: '#4E555E',
              background: 'transparent',
              color: 'white',
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SendIcon sx={{ color: 'white' }} />
                </IconButton>
                <Box sx={{ transform: 'rotate(180deg)' }}>
                  <Image
                    src="wizecoin.svg"
                    alt="Wizecoin Icon"
                    width={20}
                    height={20}
                    layout="fixed"
                  />
                </Box>
                <Typography variant="body1" style={{ color: 'red' }}>
                  17
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
