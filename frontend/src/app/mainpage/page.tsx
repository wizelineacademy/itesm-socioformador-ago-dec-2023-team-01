'use client';

import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Hidden } from '@mui/material';
import Chat from '@/app/components/Chat';
import ChatHistory from '@/app/components/ChatHistory';
import Navbar from '@/app/components/Navbar';
import NotWelcome from '../components/NotWelcome';

function Mainpage() {
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [name, setName] = useState('');
  const [profileSrc, setProfileSrc] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    setName(`${localStorage.getItem('first')} ${localStorage.getItem('last')}`);
    setProfileSrc(`${localStorage.getItem('pic')}`);
    setToken(`${localStorage.getItem('amountTokens')}`);
  }, []);

  if (name === null) {
    return <NotWelcome />;
  }

  return (
    <Container>
      <Navbar
        profileSrc={profileSrc}
        name={name}
        number={token}
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
          <Chat profileSrc={profileSrc} />
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

export default Mainpage;
