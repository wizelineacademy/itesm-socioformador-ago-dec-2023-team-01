'use client';

// @react server
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { Hidden } from '@mui/material';
import Chat from '@/app/components/Chat';
import ChatHistory from '@/app/components/ChatHistory';
import Navbar from '@/app/components/Navbar';
import Awaiting from '../components/awaiting';
import NotWelcome from '../components/NotWelcome';
import { getHistory } from '@/services/usersService';

function Mainpage() {
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [profileSrc, setProfileSrc] = useState('');
  const [conversationId, setConversationId] = useState(0);
  const [chatsHistory, setChatsHistory] = useState([{ title: '', id: 0 }]);

  const getChatHistory = async () => {
    try {
      const response = await getHistory(userId);
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

  const handleChatItemClick = (id: number) => {
    setConversationId(id);
    // console.log('chat item clicked', id);
  };

  useEffect(() => {
    setUserId(`${localStorage.getItem('sub')}`);
    setName(`${localStorage.getItem('first')} ${localStorage.getItem('last')}`);
    setProfileSrc(`${localStorage.getItem('pic')}`);
  }, []);

  useEffect(() => {
    if (userId === '') return;
    getHistory(userId).then((data) => {
      const chatInformation = data.map((chat: { title: any; id: any; }) => ({
        title: chat.title,
        id: chat.id,
      }));
      setChatsHistory(chatInformation);
      // console.log(data);
    });
  }, [userId]);

  // useEffect(() => {
  //   if (user) setUserId(user.sub ?? '');
  // }, [user]);

  if (userId === '') return <Awaiting />;
  console.log({
    userId,
    name,
  });
  return (
    <Container maxWidth={false}>
      <Navbar
        profileSrc={profileSrc}
        name={name}
        number={`${localStorage.getItem('amountTokens')}`}
        onBurgerClick={() => setShowChatHistory((prev) => !prev)}
      />
      <Grid container spacing={1} columns={10}>
        {/* ChatHistory for larger screens (displayed by default) */}
        <Hidden only={['xs']}>
          <Grid item sm={2}>
            <ChatHistory closeChatHistory={() => setShowChatHistory(false)} chatHistory={chatsHistory} handleChatItemClick={handleChatItemClick} setConversationId={setConversationId} getChatHistory={getChatHistory} conversationId={conversationId} />
          </Grid>
        </Hidden>

        <Grid item xs={10} sm={8}>
          <Chat setConversationId={setConversationId} conversationId={conversationId} getChatHistory={getChatHistory} />
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
              <ChatHistory closeChatHistory={() => setShowChatHistory(false)} chatHistory={chatsHistory} handleChatItemClick={handleChatItemClick} setConversationId={setConversationId} getChatHistory={getChatHistory} conversationId={conversationId} />

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
              <ChatHistory closeChatHistory={() => setShowChatHistory(false)} chatHistory={chatsHistory} handleChatItemClick={handleChatItemClick} setConversationId={setConversationId} getChatHistory={getChatHistory} conversationId={conversationId} />
            </div>
          )}
        </Hidden>
      </Grid>
    </Container>
  );
  return <NotWelcome />;
}

export default Mainpage;
