'use client';

import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { WelcomeProps } from '../components/types';
import TopNavbar from './components/topNavbar';
import SideNavbar from './components/sideNavbar';
import { fetchUserCurrentTokens } from '@/services/tokenService';
import Awaiting from '../components/awaiting';

export default function Mainpage() {
  const [wizeliner, setWizeliner] = useState<WelcomeProps>({
    admin: false,
    firstName: '',
    lastName: '',
    wizecoins: '',
    IsWizeliner: false,
    name: '',
    picSource: '',
  });

  const [userTokens, setUserTokens] = useState({
    amountTokens: '0',
    currentAmountTokens: '0',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem('role') !== null) {
          const userTokensData = await fetchUserCurrentTokens(`${localStorage.getItem('role')}`);
          setUserTokens(userTokensData);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setWizeliner({
      admin: localStorage.getItem('role') === 'admin',
      firstName: `${localStorage.getItem('first')}`,
      lastName: `${localStorage.getItem('last')}`,
      wizecoins: `${userTokens.currentAmountTokens ?? 0}`,
      IsWizeliner: true,
      name: `${localStorage.getItem('first')} ${localStorage.getItem('last')}`,
      picSource: `${localStorage.getItem('pic')}`,
    });
  }, [userTokens]);

  if (wizeliner.firstName === '') return <Awaiting />;

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
        <TopNavbar {...wizeliner} />
      </Box>
      <Stack direction="row">
        <Box
          sx={{
            height: 'calc(100vh - 76px)',
            position: 'fixed',
            top: '76px',
          }}
        >
          <SideNavbar />
        </Box>
      </Stack>
    </Stack>
  );
}
