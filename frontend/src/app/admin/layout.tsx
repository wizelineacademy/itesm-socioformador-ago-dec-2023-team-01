'use client';

import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import SideNav from './components/side-nav';
import ProfileInfo from './components/profile-info';
import { WelcomeProps } from '../components/types';
import Awaiting from '../components/awaiting';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wizeliner, setWizeliner] = useState<WelcomeProps>({
    admin: false,
    firstName: '',
    lastName: '',
    wizecoins: '',
    IsWizeliner: false,
    name: '',
    picSource: '',
  });

  useEffect(() => {
    console.log(localStorage.getItem('token'));
    setWizeliner({
      admin: true,
      firstName: localStorage.getItem('first') as string,
      lastName: localStorage.getItem('last') as string,
      wizecoins: localStorage.getItem('amountTokens') as string,
      IsWizeliner: true,
      name: `${localStorage.getItem('first')} ${localStorage.getItem('last')}`,
      picSource: localStorage.getItem('pic'),
    });
  }, []);

  if (wizeliner.firstName === '') return <Awaiting />;

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
