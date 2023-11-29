'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { Message } from 'ai';
import { useChat } from 'ai/react';
import { Hidden } from '@mui/material';
import { useSelector } from 'react-redux';
import Chat from '@/app/components/Chat';
import ChatHistory from '@/app/components/ChatHistory';
import Navbar from '@/app/components/Navbar';
import { getHistory } from '@/services/usersService';
import { numTokensFromMessage, postToConversation } from '@/services/chatService';
import { RootState } from '../redux/store';
import NotWelcome from '../components/NotWelcome';

const postMessagesToConversation = async (conversationId: number, messages: Message[]) => {
  const last2Messages = messages.slice(-2);
  const prompt = last2Messages.find((message) => message.role === 'user');
  const response = last2Messages.find((message) => message.role === 'assistant');
  if (prompt && response && conversationId) {
    if (response.id.startsWith('Nic0WzPpt') || prompt.id.startsWith('Nic0WzPpt')) {
      return;
    }
    const tokensFromPrompt = numTokensFromMessage(prompt);
    const tokensFromResponse = numTokensFromMessage(response);
    const tokens = tokensFromPrompt + tokensFromResponse;

    await postToConversation(prompt.content, response.content, conversationId, tokens);
    console.log('posted to conversation', messages);
  }
};

function Mainpage() {
  const [showChatHistory, setShowChatHistory] = useState(false);
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

  // useEffect(() => {
  //   if (user) setUserId(user.sub ?? '');
  // }, [user]);

  if (!user) return <NotWelcome />;

  return (
    <Container maxWidth={false}>
      <Navbar
        profileSrc={user.picture}
        name={`${user.firstName} ${user.lastName}`}
        number={`${user.tokens.currentAmountTokens}`}
        onBurgerClick={() => setShowChatHistory((prev) => !prev)}
      />
      <Grid container spacing={1} columns={10}>
        {/* ChatHistory for larger screens (displayed by default) */}
        <Hidden only={['xs']}>
          <Grid item sm={2}>
            <ChatHistory closeChatHistory={() => setShowChatHistory(false)} chatHistory={chatsHistory} handleChatItemClick={handleChatItemClick} getChatHistory={getChatHistory} conversationId={conversationId} />
          </Grid>
        </Hidden>

        <Grid item xs={10} sm={8}>
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
        </Grid>

        <Hidden mdUp>
          {showChatHistory && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent backdrop
              }}
            >
              <ChatHistory closeChatHistory={() => setShowChatHistory(false)} chatHistory={chatsHistory} handleChatItemClick={handleChatItemClick} getChatHistory={getChatHistory} conversationId={conversationId} />

            </div>
          )}
        </Hidden>

        <Hidden smUp>
          {showChatHistory && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              <ChatHistory closeChatHistory={() => setShowChatHistory(false)} chatHistory={chatsHistory} handleChatItemClick={handleChatItemClick} getChatHistory={getChatHistory} conversationId={conversationId} />
            </div>
          )}
        </Hidden>
      </Grid>
    </Container>
  );
  return <NotWelcome />;
}

export default Mainpage;
