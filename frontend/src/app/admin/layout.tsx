'use client';

import React, { } from 'react';
import { Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import SideNav from './components/side-nav';
import ProfileInfo from './components/profile-info';
import { WelcomeProps } from '../components/types';
import NotAuthorized from './components/notAuthorized';
import { RootState } from '../redux/store';
import NotWelcome from '../components/NotWelcome';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.user.userInfo);
  if (!user) return <NotWelcome />;

  const wizeliner: WelcomeProps = {
    isAdmin: user.role === 'admin',
    firstName: user.firstName,
    lastName: user.lastName,
    wizecoins: String(user.tokens.currentAmountTokens),
    name: `${user.firstName} ${user.lastName}`,
    picSource: user.picture,
  };
  // if (wizeliner.firstName === '') return <Awaiting />;
  if (wizeliner.isAdmin === false) return <NotAuthorized />;

  return (
    <Stack direction="row">
      <Box sx={{ height: '100vh', position: 'sticky', top: '0' }}>
        <SideNav />
      </Box>
      <Stack>
        <Box
          sx={{
            position: 'sticky',
            top: '0',
            background: 'rgba(17, 24, 35, 0.4)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: '100',
          }}
        >
          <Box sx={{ position: 'relative', right: '3.3rem' }}>
            <ProfileInfo {...wizeliner} />
          </Box>
        </Box>
        <Box>{children}</Box>
      </Stack>
    </Stack>
  );
}
