/* eslint-disable no-restricted-syntax */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import _debounce from 'lodash/debounce';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import BlockIcon from '@mui/icons-material/Block';
import InputAdornment from '@mui/material/InputAdornment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import CheckIcon from '@mui/icons-material/Check';
import { Message } from 'ai/react';
import Markdown from 'react-markdown';
import CircularProgress from '@mui/material/CircularProgress';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button, Stack } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';
import { ChatRequestOptions } from 'ai';
import { useDispatch, useSelector } from 'react-redux';
import { VariantType, enqueueSnackbar } from 'notistack';
import {
  numTokensFromMessage,
  createConversation,
  getConversationFullChat,
} from '../../services/chatService';
import { AppDispatch, RootState } from '../redux/store';
import NotWelcome from './NotWelcome';
import { subtractTokens } from '../redux/features/userSlice';

interface ChatProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void;
  isLoading: boolean;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  setConversationId: (id: number) => void;
  conversationId: number;
  getChatHistory: () => void;
  stopChat: () => void;
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
  return tempMessages;
}

export default function Chat({
  setConversationId, conversationId, getChatHistory, input, setInput, handleInputChange, handleSubmit, isLoading, messages, setMessages, stopChat,
}: ChatProps) {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [isCopied, setCopied] = useState(false);
  const scrollRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current as HTMLDivElement;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  };
  const [tokensFromPrompt, setTokensFromPrompt] = useState(0);
  const [lastTokensFromResponse, setLastTokensFromResponse] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const showNotification = (variant: VariantType, text:string, action:string) => {
    enqueueSnackbar(`${action} ${text}`, { variant });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.role === 'assistant' && isLoading) {
      const curTokensResponse = numTokensFromMessage(lastMessage);
      setLastTokensFromResponse((prevTokens) => {
        const diff = curTokensResponse - prevTokens;
        if (diff > 0) {
          dispatch(subtractTokens(diff));
        }
        return curTokensResponse;
      });
    } else if (lastMessage && lastMessage.role === 'assistant' && !isLoading) {
      setLastTokensFromResponse(0);
    }
  }, [dispatch, isLoading, messages]);

  useEffect(() => {
    if (!user) return;
    if (user.tokens.currentAmountTokens === 0) {
      stopChat();
      showNotification('error', 'to chat', 'No more tokens ');
    }
  }, [stopChat, user]);

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
    if (!user) return;
    if (conversationId === 0 && messages.length === 1) {
      const title = messages[0].content.slice(0, 30).trimEnd();
      createConversation(user.id, title).then((conversation) => {
        setConversationId(conversation.id);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const lastMessage = () => {
    if (messages.length > 0) {
      return messages[messages.length - 1];
    }
    return undefined;
  };

  const debouncedHandleInputChange = _debounce(
    (e) => {
      setTokensFromPrompt(numTokensFromMessage({ content: e.target.value }));
    },
    300,
  );

  if (!user) return <NotWelcome />;

  return (
    <Box
      sx={{
        height: 'calc(100vh - 65px)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        ref={scrollRef}
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
              alignItems: 'flex-end',
              justifyContent: message.role === 'assistant' ? 'flex-start' : 'flex-end',
              marginBottom: '10px',
              marginLeft: message.role === 'assistant' ? '0px' : '20px',
              marginRight: message.role === 'assistant' ? '20px' : '0px',
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
                  marginBottom: '4px',
                }}
              />
            )}
            <Typography
              variant="body2"
              style={{
                paddingInline: '10px',
                borderRadius: '20px',
                background: message.role !== 'assistant' ? '#111823' : '#0E8265',
                color: 'white',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
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
                          justifyContent="space-between"
                          sx={{
                            borderRadius: '10px 10px 0 0',
                            backgroundColor: 'black',
                            height: '30px',
                            position: 'relative',
                            top: '10px',
                            color: 'white',
                          }}
                        >
                          <Typography sx={{ color: 'white', fontSize: '11px' }} ml={1}>
                            {match[1].toUpperCase()}
                          </Typography>
                          <CopyToClipboard text={String(children)}>
                            <Button sx={{ textTransform: 'none', color: 'white' }} onClick={handleCopy}>
                              {isCopied ? (
                                <Stack direction="row">
                                  <CheckIcon sx={{ fontSize: '15px' }} />
                                  <Box sx={{ padding: '2px' }} />
                                  <Typography sx={{ color: 'white', fontSize: '11px' }}>Copied!</Typography>
                                </Stack>
                              ) : (
                                <Stack direction="row">
                                  <ContentCopyIcon sx={{ fontSize: '15px' }} />
                                  <Box sx={{ padding: '2px' }} />
                                  <Typography sx={{ color: 'white', fontSize: '11px' }}>Copy Code</Typography>
                                </Stack>
                              )}
                            </Button>
                          </CopyToClipboard>
                        </Stack>
                        {// @ts-ignore}
                          <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                              // eslint-disable-next-line react/no-children-prop
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            style={atomDark}
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
                src={user.picture}
                sx={{
                  width: 40,
                  height: 40,
                  marginLeft: '10px',
                  marginBottom: '4px',
                }}
              />
            )}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          padding: '10px',
          bottom: 0,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            setTokensFromPrompt(0);
          }}
          ref={formRef}
          style={{ width: '100%' }}
        >
          <TextField
            fullWidth
            value={input}
            multiline
            disabled={user.tokens.currentAmountTokens === 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (formRef.current !== undefined) {
                  formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
              } else if (e.key === 'Enter' && e.shiftKey) {
                setInput(`${input}\n`);
              }
            }}
            autoComplete="off"
            onChange={(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
              handleInputChange(e);
              debouncedHandleInputChange(e);
            }}
            placeholder="Type a message..."
            maxRows={5}
            sx={{

              overflowY: 'auto',
              maxHeight: '200px',
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
                <InputAdornment position="end" sx={{ position: 'inherit' }}>
                  {user.tokens.currentAmountTokens > 0 && isLoading && lastMessage()?.role !== 'user' && (
                  <IconButton onClick={(e) => {
                    e.preventDefault();
                    stopChat();
                  }}
                  >
                    <StopCircleIcon fontSize="large" sx={{ color: 'white' }} />
                  </IconButton>
                  )}
                  {user.tokens.currentAmountTokens > 0 && isLoading && lastMessage()?.role === 'user' && (
                  <CircularProgress size={35} thickness={4} sx={{ color: 'white', marginRight: '10px' }} />
                  )}
                  {user.tokens.currentAmountTokens === 0 && (
                    <BlockIcon fontSize="large" sx={{ color: 'white' }} />
                  )}
                  {user.tokens.currentAmountTokens > 0 && !isLoading && (
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
                  <Typography variant="body1" style={{ color: 'red' }} ml={1}>
                    {tokensFromPrompt}
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>
    </Box>
  );
}
