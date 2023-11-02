'use client';

import { Provider } from 'react-redux';
import React from 'react';
import { Box, Stack } from '@mui/material';
import SideNav from './components/side-nav';
import ProfileInfo from './components/profile-info';
import { WelcomeProps } from '../components/types';
import { store } from '@/store';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const wizeliner: WelcomeProps = {
    admin: true,
    firstName: 'Thomas',
    lastName: 'Anderson',
    wizecoins: '120',
    IsWizeliner: true,
    name: 'Thomas Anderson',
    picSource: 'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2015/11/albert-einstein-retrato-scaled.jpg?fit=2560%2C1985&quality=50&strip=all&ssl=1',
  };

  return (
    <Provider store={store}>
      <Stack direction="row">
        <Box sx={{ height: '100vh', position: 'sticky', top: '0' }}>
          <SideNav />
        </Box>
        <Stack>
          <Box
            sx={{
              position: 'sticky',
              top: '0',
              background: 'linear-gradient(rgba(0,0,0,0.5) 30%, transparent)',
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
    </Provider>
  );
}
