'use client';

// @react server
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { Box, Hidden } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0/client';
import Chat from '@/app/components/Chat';
import ChatHistory from '@/app/components/ChatHistory';
import Navbar from '@/app/components/Navbar';
import Awaiting from '../components/awaiting';
import NotWelcome from '../components/NotWelcome';
import { getHistory } from '@/services/usersService';

function Mainpage() {
  const [showChatHistory, setShowChatHistory] = useState(false);
  const { user, error, isLoading } = useUser();
  const [userId, setUserId] = useState(user?.sub ?? '');
  const [conversationId, setConversationId] = useState(0);
  const [chatsHistory, setChatsHistory] = useState([{ title: '', id: 0 }]);

  const handleChatItemClick = (id: number) => {
    setConversationId(id);
  };
  useEffect(() => {
    if (userId === '') return;
    getHistory(userId).then((data) => {
      const chatInformation = data.map((chat: { title: any; id: any; }) => ({
        title: chat.title,
        id: chat.id,
      }));
      setChatsHistory(chatInformation);
      console.log(data);
    });
  }, [userId]);

  useEffect(() => {
    if (user) setUserId(user.sub ?? '');
  }, [user]);

  if (isLoading) return <Awaiting />;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <Container maxWidth={false}>
        <Navbar
          profileSrc={user.picture}
          name={user.name}
          number={`${localStorage.getItem('amountTokens')}`}
          onBurgerClick={() => setShowChatHistory((prev) => !prev)}
        />
        <Grid container spacing={1} columns={10}>
          {/* ChatHistory for larger screens (displayed by default) */}
          <Hidden only={['xs']}>
            <Grid item sm={2}>
              <ChatHistory closeChatHistory={() => setShowChatHistory(false)} chatHistory={chatsHistory} handleChatItemClick={handleChatItemClick} />
            </Grid>
          </Hidden>

          <Grid item xs={10} sm={8}>
            <Chat user={user} convId={conversationId} />
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
                <ChatHistory closeChatHistory={() => setShowChatHistory(false)} chatHistory={chatsHistory} handleChatItemClick={handleChatItemClick} />

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
                <ChatHistory closeChatHistory={() => setShowChatHistory(false)} chatHistory={chatsHistory} handleChatItemClick={handleChatItemClick} />

              </div>
            )}
          </Hidden>
        </Grid>
      </Container>
    );
  }
  return <NotWelcome />;
}

export default Mainpage;
