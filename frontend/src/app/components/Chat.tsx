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
import {
  encodingForModel,
  getEncoding,
  type TiktokenModel,
  type TiktokenEncoding,
  Tiktoken,
} from 'js-tiktoken';

export default function Chat({ profileSrc }:any) {
  function numTokensFromMessages(messages: any[], model: string = 'gpt-3.5-turbo-0613'): number {
    let encoding:Tiktoken;
    try {
      encoding = encodingForModel(model as TiktokenModel);
    } catch (error) {
      encoding = getEncoding('cl100k_base' as TiktokenEncoding);
    }
    if (model === 'gpt-3.5-turbo-0613') {
      let numTokens = -3; // fix constant -3 deviation
      for (const message of messages) {
        numTokens += 4; // every message follows <im_start>{role/name}\n{content}<im_end>\n
        numTokens += (encoding.encode(message.content)).length;
        if (message.key === 'name') {
          numTokens -= 1;
        }
      }
      numTokens += 2; // every reply is primed with <im_start>assistant
      return numTokens;
    }
    throw new Error(`numTokensFromMessages() is not presently implemented for model ${model}.
        See https://github.com/openai/openai-python/blob/main/chatml.md for information on how messages are converted to tokens.`);
  }

  const {
    input, handleInputChange, handleSubmit, isLoading, messages,
  } = useChat({
    api: '/api/chat',
  });

  const [tokenCount, setTokenCount] = useState(0);
  const calculateTokenCount = () => {
    const model = 'gpt-3.5-turbo-0613';
    const contextMessages = [
      { role: 'system', content: 'You are a helpful assistant expert in programming.' },
      ...messages,
    ];

    const tokens = numTokensFromMessages(contextMessages, model);

    setTokenCount(tokens);
  };
  useEffect(() => {
    console.log('1', tokenCount);
  }, [tokenCount]);

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
