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
import { UserProfile } from '@auth0/nextjs-auth0/client';
import Markdown from 'react-markdown';
import CircularProgress from '@mui/material/CircularProgress';
import {
  numTokensFromMessage,
  createConversation,
  postToConversation,
  getConversationFullChat,
} from '../../services/chatService';

async function getMessages(conversationId: number) {
  const response = await getConversationFullChat(conversationId);
  const messages = response.messages;
  const tempMessages: Message[] = [];
  messages.forEach((message: any) => {
    const newUserMessage: Message = {
      id: `Nic0WzPpt${String(message.id)}a`,
      content: message.prompt,
      role: 'user',
    };
    const newAssistantMessage: Message = {
      id: `Nic0WzPpt${String(message.id)}b`,
      content: message.content,
      role: 'assistant',
    };
    tempMessages.push(newAssistantMessage);
    tempMessages.push(newUserMessage);
  });
  tempMessages.reverse();
  // console.log('mensajes traidos', tempMessages);
  return tempMessages;
}

export default function Chat({ user, convId }: { user: UserProfile, convId: number }) {
  const [conversationId, setConversationId] = useState<number>(convId);
  const {
    input, handleInputChange, handleSubmit, isLoading, messages, setMessages,
  } = useChat({
    api: '/api/chat',
  });

  // actualizar el conversationId cuando cambie el id
  useEffect(() => {
    console.log('id changed', convId);
    setMessages([]);
    setConversationId(convId);
  }, [convId]);

  // actualizar conversacion con los mensajes de la db si hay un conversationId
  useEffect(() => {
    // console.log('id changeddddd', convId);
    if (conversationId !== 0) {
      getMessages(conversationId).then((mesg) => {
        setMessages(mesg);
      });
    }
  }, [conversationId]);

  // crear una conversacion si no hay ninguna
  useEffect(() => {
    if (conversationId === 0 && messages.length > 0) {
      console.log('convesasion  no hay, messages:', messages);
      const title = messages[0].content.slice(0, 30).trimEnd();
      createConversation(user.sub ?? '', title).then((conversation) => {
        setConversationId(conversation.id);
        console.log('created new conversation with id', conversation.id);
      });
    }
  }, [isLoading, messages]);

  // post new messages to conversation
  useEffect(() => {
    if (!isLoading) {
      const last2Messages = messages.slice(-2);
      const prompt = last2Messages.find((message) => message.role === 'user');
      const response = last2Messages.find((message) => message.role === 'assistant');
      console.log('prompt', prompt);
      console.log('response', response);
      if (prompt && response && conversationId) {
        console.log('sliced messages');
        if (response.id.startsWith('Nic0WzPpt') || prompt.id.startsWith('Nic0WzPpt')) {
          console.log('message already in db');
          return;
        }
        const tokensFromPrompt = numTokensFromMessage(prompt);
        const tokensFromResponse = numTokensFromMessage(response);
        const tokens = tokensFromPrompt + tokensFromResponse;
        console.log('tokens prompt', tokensFromPrompt);
        console.log('tokens response', tokensFromResponse);
        console.log('tokens', tokens);

        postToConversation(prompt.content, response.content, conversationId, tokens).then((conversation) => {
          console.log('conversation', conversation);
          console.log('posted to conversation');
        });
      } else {
        console.log('no prompt or response');
      }
    } else {
      console.log('loading');
    }
  }, [conversationId, isLoading, messages]);

  return (
    <Box
      height={{
        xs: '87vh', sm: '87vh', md: '87vh', lg: '85vh',
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom, #4D545D, #4F565F, transparent)',
        borderRadius: '20px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          ChatGPT 4.0
        </Typography>
      </Box>
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
                paddingInline: '10px',
                borderRadius: '20px',
                background: message.role !== 'assistant' ? '#0E8265' : '#111823',
                color: 'white',
              }}
            >
              <Markdown>
                {message.content}
              </Markdown>
            </Typography>
            {message.role !== 'assistant' && (
              <Avatar
                alt="User Picture"
                src={user?.picture || 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1700438400&semt=ais'}
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
                    borderColor: '#4E555E',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
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
                    {isLoading ? <CircularProgress size={35} thickness={4} sx={{ color: 'white', marginRight: '10px' }} />
                      : (
                        <IconButton type="submit">
                          <SendIcon sx={{ color: 'white' }} />
                        </IconButton>
                      )}
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
