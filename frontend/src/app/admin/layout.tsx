'use client';

import React from 'react';
import { Box, Stack, Skeleton } from '@mui/material';
import SideNav from './components/side-nav';
import ProfileInfo from './components/profile-info';
import { useUser } from '@auth0/nextjs-auth0/client';
import Awaiting from '../components/awaiting';
import NotWelcome from '../components/NotWelcome';

export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    const { user, error, isLoading } = useUser();

    if (isLoading) return (
      <Stack direction={'row'}>
          <Box sx={{height: '100vh', position: 'sticky', top: '0'}}>
            <SideNav/>
          </Box>
          <Stack>
            <Box sx={{position: 'sticky', top: '0', background: 'linear-gradient(rgba(0,0,0,0.5) 30%, transparent)', zIndex:'100'}}>
              <Skeleton variant="rectangular" height={'70px'} width={'200px'}/>
            </Box>
            <Box><Awaiting/></Box>
          </Stack>
        </Stack>
    )
    if (error) return <div>{error.message}</div>;
    if (user) {
      return (
        <Stack direction={'row'}>
          <Box sx={{height: '100vh', position: 'sticky', top: '0'}}>
            <SideNav/>
          </Box>
          <Stack>
            <Box sx={{position: 'sticky', top: '0', background: 'linear-gradient(rgba(0,0,0,0.5) 30%, transparent)', zIndex:'100'}}>
              <Box sx={{position: 'relative', right:'3.3rem'}}>
                <ProfileInfo name={user.name} wizecoins={'120'} admin={true} IsWizeliner={true} picSource={user.picture} />
              </Box>
            </Box>
            <Box>{children}</Box>
          </Stack>
        </Stack>
      );
    }
    return <NotWelcome />
  }