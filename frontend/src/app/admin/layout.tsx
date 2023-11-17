'use client';

import React from 'react';
import { Box, Stack } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0/client';
import SideNav from './components/side-nav';
import ProfileInfo from './components/profile-info';
import { WelcomeProps } from '../components/types';
import NotWelcome from '../components/NotWelcome';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  if (user) {
    const wizeliner: WelcomeProps = {
      admin: user.role === 'admin',
      firstName: user.given_name as string,
      lastName: user.family_name as string,
      wizecoins: '120',
      IsWizeliner: user.role === 'admin' || user.role === 'wizeliner',
      name: user.name,
      picSource: user.picture,
    };

    console.log(wizeliner);

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
  return <NotWelcome />;
}
