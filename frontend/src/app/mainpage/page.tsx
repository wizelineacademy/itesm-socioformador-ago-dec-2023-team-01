'use client';

// @react server
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { Hidden } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0/client';
import Chat from '@/app/components/Chat';
import ChatHistory from '@/app/components/ChatHistory';
import Navbar from '@/app/components/Navbar';
import Awaiting from '../components/awaiting';
import NotWelcome from '../components/NotWelcome';

function Mainpage() {
  const [showChatHistory, setShowChatHistory] = useState(false);
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Awaiting />;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <Container>
        <Navbar
          profileSrc={user.picture}
          name={user.name}
          number={`${localStorage.getItem('amountTokens')}`}
          onBurgerClick={() => setShowChatHistory((prev) => !prev)}
        />

        <Grid container spacing={1}>
          {/* ChatHistory for larger screens (displayed by default) */}
          <Hidden only={['xs']}>
            <Grid item sm={3}>
              <ChatHistory />
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={9}>
            <Chat user={user} />
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
                <ChatHistory closeChatHistory={() => setShowChatHistory(false)} />
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
                <ChatHistory closeChatHistory={() => setShowChatHistory(false)} />
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
