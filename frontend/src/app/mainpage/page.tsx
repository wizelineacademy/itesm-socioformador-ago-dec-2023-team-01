'use client';

import React, { useEffect, useState } from 'react';
import { Message } from 'ai';
import { useChat } from 'ai/react';
import { Box, Grid, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '@/app/components/Chat';
import { getHistory } from '@/services/usersService';
import { postToConversation } from '@/services/chatService';
import { AppDispatch, RootState } from '../redux/store';
import NotWelcome from '../components/NotWelcome';
import { susbtractTokensToUser } from '@/services/tokenService';
import { subtractTokens, updateCurrentTokens } from '../redux/features/userSlice';
import TopNavbar from './components/topNavbar';
import SideNavbar from './components/sideNavbar';

export default function Mainpage() {
  // const [showChatHistory, setShowChatHistory] = useState(false);
  const [conversationId, setConversationId] = useState(0);
  const [chatsHistory, setChatsHistory] = useState([{ title: '', id: 0 }]);
  const [isChatStopped, setIsChatStopped] = useState(false);
  const [prevConversationId, setPrevConversationId] = useState(0);
  const {
    input, setInput, handleInputChange, handleSubmit, isLoading: chatIsLoading, messages, setMessages, stop,
  } = useChat({
    api: '/api/chat',
  });
  const user = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch<AppDispatch>();

  const postMessagesToConversation = async (convId: number, messagess: Message[], userId: string) => {
    const last2Messages = messagess.slice(-2);
    const prompt = last2Messages.find((message) => message.role === 'user');
    const response = last2Messages.find((message) => message.role === 'assistant');
    if (prompt && response && convId) {
      if (response.id.startsWith('Nic0WzPpt') || prompt.id.startsWith('Nic0WzPpt')) {
        return;
      }
      // post to conversation
      let tokensFromPost = 0;
      try {
        tokensFromPost = await postToConversation(prompt, response, convId);
      } catch (error) {
        console.log(error);
      }
      // substract user tokens
      try {
        if (tokensFromPost > 0) {
          const updatedUser = await susbtractTokensToUser(userId, tokensFromPost);
          dispatch(subtractTokens(tokensFromPost));
          dispatch(updateCurrentTokens(updatedUser.currentAmount));
        }
      } catch (error) {
        console.log(error);
      }
      console.log('posted to conversation', messagess);
    }
  };

  const executePostMessagesToConversation = async (convId: number) => {
    if (!chatIsLoading && isChatStopped) {
      setIsChatStopped(false);
      setPrevConversationId(0);
      // console.log('finishing posting messages to conversation with id', convId);
      postMessagesToConversation(convId, messages, user?.id ?? '');
    } else if (!chatIsLoading) {
      postMessagesToConversation(convId, messages, user?.id ?? '');
    } else {
      // console.log('loading');
    }
  };

  const handleChatItemClick = async (id: number) => {
    if (chatIsLoading) {
      setIsChatStopped(true);
      setPrevConversationId(conversationId);
      stop();
    }
    setConversationId(id);
  };

  // post new messages to conversation
  useEffect(() => {
    executePostMessagesToConversation(prevConversationId === 0 ? conversationId : prevConversationId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatIsLoading, messages]);

  const getChatHistory = async () => {
    if (!user) return [];
    try {
      const response = await getHistory(user.id);
      const chatHistory = response.map((conversation: any) => ({
        title: conversation.title,
        id: conversation.id,
      }));
      setChatsHistory(chatHistory);
      return chatHistory;
    } catch (er) {
      console.log(er);
      return [];
    }
  };

  useEffect(() => {
    if (!user) return;
    getHistory(user.id).then((data) => {
      const chatInformation = data.map((chat: { title: any; id: any; }) => ({
        title: chat.title,
        id: chat.id,
      }));
      setChatsHistory(chatInformation);
      // console.log(data);
    });
  }, [user]);

  if (!user) return <NotWelcome />;

  return (
    <Stack overflow="hidden">
      <Box
        sx={{
          height: '75px',
          top: '0',
          background: 'rgba(17, 24, 35, 0.4)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: '100',
        }}
      >
        <TopNavbar
          firstName={user.firstName}
          lastName={user.lastName}
          wizecoins={user.tokens.currentAmountTokens}
          picSource={user.picture}
        />
      </Box>
      <Grid container style={{ height: 'calc(100vh - 75px)' }}>
        <Grid item lg={2}>
          <SideNavbar
            chatHistory={chatsHistory}
            handleChatItemClick={handleChatItemClick}
            getChatHistory={getChatHistory}
            conversationId={conversationId}
          />
        </Grid>
        <Grid item lg={10}>
          <Chat
            setConversationId={setConversationId}
            conversationId={conversationId}
            getChatHistory={getChatHistory}
            input={input}
            setInput={setInput}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={chatIsLoading}
            messages={messages}
            setMessages={setMessages}
            stopChat={stop}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
