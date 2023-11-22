/* eslint-disable no-restricted-syntax */

'use client';

import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useChat, Message } from 'ai/react';
// import { UserProfile } from '@auth0/nextjs-auth0/client';
import { numTokensFromMessage, createConversation, postToConversation } from '../../services/chatService';

export default function Chat() {
  const [conversationId, setConversationId] = useState(0);
  const [sub, setSub] = useState('');
  const [pic, setPic] = useState('');
  const {
    input, handleInputChange, handleSubmit, isLoading, messages,
  } = useChat({
    api: '/api/chat',
  });

  const [tokenCount, setTokenCount] = useState(0);
  // const calculateTokenCount = () => {
  //   const model = 'gpt-3.5-turbo-0613';
  //   const contextMessages = [
  //     { role: 'system', content: 'You are a helpful assistant expert in programming.' },
  //     ...messages,
  //   ];

  //   const tokens = numTokensFromMessage(contextMessages, model);

  //   setTokenCount(tokens);
  // };
  // useEffect(() => {
  // console.log('1', tokenCount);
  // }, [tokenCount]);

  useEffect(() => {
    setSub(`${localStorage.getItem('sub')}`);
    setPic(`${localStorage.getItem('pic')}`);
  }, []);

  useEffect(() => {
    if (messages.length === 1) {
      const title = `${messages[0].content.slice(0, 15).trimEnd()}...`;
      createConversation(sub ?? '', title).then((conversation) => {
        setConversationId(conversation.id);
      });
    }
  }, [messages, sub]);

  useEffect(() => {
    console.log('conversationId:', conversationId);
    console.log('cantidad de mensajes', messages.length);
    if (!isLoading) {
      const last2Messages = messages.slice(-2);
      const prompt = last2Messages.filter((message) => message.role === 'user')[0];
      const response = last2Messages.filter((message) => message.role === 'assistant')[0];
      if (!prompt || !response) return;
      if (last2Messages.length === 2 && conversationId !== 0) {
        console.log('last 2 messages', last2Messages);
        console.log('prompt', prompt);
        const tokensFromPrompt = numTokensFromMessage(prompt);
        console.log('tokens from prompt', tokensFromPrompt);
        console.log('response', response);
        const tokensFromResponse = numTokensFromMessage(response);
        console.log('tokens from response', tokensFromResponse);
        const tokens = tokensFromPrompt + tokensFromResponse;
        console.log('tokens', tokens);
        postToConversation(prompt.content, response.content, conversationId, tokens).then((conversation) => {
          console.log('conversation', conversation);
          console.log('posted to conversation');
        });
      }
    } else {
      console.log('loading');
    }
  }, [conversationId, isLoading, messages, sub]);

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
                message.role === 'assistant' ? 'flex-start' : 'flex-end',
              marginBottom: '10px',
            }}
          >
            {message.role === 'assistant' && (
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
                background: message.role !== 'assistant' ? '#0E8265' : '#111823',
                color: 'white',
              }}
            >
              {message.content.split('\n').map((currentTextBlock: string, idx: number) => {
                if (currentTextBlock === '') {
                  return <p key={message.id + idx}>&nbsp;</p>;
                }
                return (
                  <React.Fragment key={message.id + idx}>
                    {idx > 0 && <br />}
                    {' '}
                    {/* Add a line break for multiline messages */}
                    {currentTextBlock}
                  </React.Fragment>
                );
              })}
            </Typography>
            {message.role !== 'assistant' && (
              <Avatar
                alt="User Picture"
                src={pic || 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1700438400&semt=ais'}
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
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          position: 'sticky',
          bottom: 0,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          style={{ width: '100%' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              value={input}
              onChange={handleInputChange}
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
                    <IconButton type="submit">
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
          </div>
        </form>
      </Box>
    </Box>
  );
}
