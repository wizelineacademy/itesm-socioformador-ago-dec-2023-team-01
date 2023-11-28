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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useChat, Message } from 'ai/react';
import Markdown from 'react-markdown';
import CircularProgress from '@mui/material/CircularProgress';
import { ChatRequestOptions } from 'ai';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  numTokensFromMessage,
  createConversation,
  postToConversation,
  getConversationFullChat,
} from '../../services/chatService';
import Awaiting from './awaiting';
import { Button, Stack } from '@mui/material';

interface ChatProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void;
  isLoading: boolean;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  setConversationId: (id: number) => void;
  conversationId: number;
  getChatHistory: () => void;
}

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
    tempMessages.push(newUserMessage);
    tempMessages.push(newAssistantMessage);
  });
  console.log('all mesasges gotten');
  return tempMessages;
}

export default function Chat({
  setConversationId, conversationId, getChatHistory, input, handleInputChange, handleSubmit, isLoading, messages, setMessages,
}: ChatProps) {
  const [userId, setUserId] = useState('');
  const [profileSrc, setProfileSrc] = useState('');

  useEffect(() => {
    setUserId(`${localStorage.getItem('sub')}`);
    setProfileSrc(`${localStorage.getItem('pic')}`);
  }, []);

  // actualizar el conversationId cuando cambie el id
  useEffect(() => {
    if (conversationId === 0) {
      setMessages([]);
    } else {
      getMessages(conversationId).then((mesg) => {
        if (mesg.length > 0) {
          setMessages(mesg);
        } else {
          setMessages([...messages]);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  // crear una conversacion si no hay ninguna
  useEffect(() => {
    if (conversationId === 0 && messages.length === 1) {
      const title = messages[0].content.slice(0, 30).trimEnd();
      createConversation(userId ?? '', title).then((conversation) => {
        setConversationId(conversation.id);
        getChatHistory();
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  if (userId === '') return <Awaiting />;
  return (
    <Box
      height={{
        xs: '91vh',
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom, #4D545D, #4F565F, transparent)',
        borderRadius: '20px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
        <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
          ChatGPT 4.0
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'scroll',
          padding: '10px',
          backgroundColor: 'transparent',
          ...conversationId === 0 && messages.length === 0 ? { display: 'flex', alignItems: 'center', justifyContent: 'center' } : {},
        }}
      >
        {conversationId === 0 && messages.length === 0 && (
        <Typography variant="h5" sx={{ color: '#b3b1b1', userSelect: 'none' }}>
          How can I help you?
        </Typography>
        )}
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'assistant' ? 'flex-start' : 'flex-end',
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
              variant="body2"
              style={{
                paddingInline: '10px',
                borderRadius: '20px',
                background: message.role !== 'assistant' ? '#0E8265' : '#111823',
                color: 'white',
              }}
            >
              <Markdown
                  // eslint-disable-next-line react/no-children-prop
                children={message.content}
                components={{
                  // eslint-disable-next-line react/no-unstable-nested-components
                  code(props) {
                    const {
                      // eslint-disable-next-line react/prop-types
                      children, className, node, ...rest
                    } = props;
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <Box
                        sx={{
                          width: '90%',
                          margin: 'auto',
                          paddingBottom: '0.70rem',
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="flex-end"
                          sx={{
                            borderRadius: '10px 10px 0 0',
                            backgroundColor: 'black',
                            height: '30px',
                            position: 'relative',
                            top: '10px',
                            color: 'white',
                          }}
                        >
                          <Button sx={{ textTransform: 'none', color: 'white' }}>
                            <ContentCopyIcon sx={{ fontSize: '15px' }} />
                            <Box sx={{ padding: '2px' }} />
                            <Typography sx={{ color: 'white', fontSize: '11px' }}>Copy Code</Typography>
                          </Button>
                        </Stack>
                        {// @ts-ignore}
                          <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                              // eslint-disable-next-line react/no-children-prop
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            style={oneDark}
                          />
                          }
                      </Box>
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </Typography>
            {message.role !== 'assistant' && (
              <Avatar
                alt="User Picture"
                src={profileSrc || 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1700438400&semt=ais'}
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
