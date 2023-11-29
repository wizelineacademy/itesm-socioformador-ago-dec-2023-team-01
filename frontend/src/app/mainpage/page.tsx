'use client';

import React, { useEffect, useState } from 'react';
import { Message } from 'ai';
import { useChat } from 'ai/react';
import {
  Box, Stack,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TopNavbar from './components/topNavbar';
import { getHistory } from '@/services/usersService';
import { numTokensFromMessage, postToConversation } from '@/services/chatService';
import NotWelcome from '../components/NotWelcome';
// import ChatHistory from '../components/ChatHistory';
import SideNavbar from './components/sideNavbar';
import Chat from '../components/Chat';

const postMessagesToConversation = async (conversationId: number, messages: Message[]) => {
  const last2Messages = messages.slice(-2);
  const prompt = last2Messages.find((message) => message.role === 'user');
  const response = last2Messages.find((message) => message.role === 'assistant');
  // console.log('prompt', prompt);
  // console.log('response', response);
  if (prompt && response && conversationId) {
    // console.log('sliced messages');
    if (response.id.startsWith('Nic0WzPpt') || prompt.id.startsWith('Nic0WzPpt')) {
      // console.log('message already in db');
      return;
    }
    const tokensFromPrompt = numTokensFromMessage(prompt);
    const tokensFromResponse = numTokensFromMessage(response);
    const tokens = tokensFromPrompt + tokensFromResponse;

    await postToConversation(prompt.content, response.content, conversationId, tokens);
    console.log('posted to conversation', messages);
    // console.log('conversation', conversation);
    // console.log('posted to conversation');
  } else {
    // console.log('no prompt or response');
  }
};

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
  console.log(user);

  const executePostMessagesToConversation = async (convId: number) => {
    if (!chatIsLoading && isChatStopped) {
      setIsChatStopped(false);
      setPrevConversationId(0);
      // console.log('finishing posting messages to conversation with id', convId);
      postMessagesToConversation(convId, messages);
    } else if (!chatIsLoading) {
      postMessagesToConversation(convId, messages);
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
      // console.log('setting chat history', chatHistory);
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
    <Stack>
      <Box
        sx={{
          height: '75px',
          position: 'sticky',
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
      <Stack direction="row">
        <Box
          sx={{
            height: 'calc(100vh - 76px)',
            position: 'fixed',
            top: '76px',
          }}
        >
          <SideNavbar
            chatHistory={chatsHistory}
            handleChatItemClick={handleChatItemClick}
            getChatHistory={getChatHistory}
            conversationId={conversationId}
          />
        </Box>
        <Stack sx={{ paddingLeft: '300px' }}>
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
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
