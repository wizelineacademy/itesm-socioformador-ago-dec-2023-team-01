'use client';

import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import SideNav from './components/side-nav';
import ProfileInfo from './components/profile-info';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Declare state variables for the user data
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [wizecoins, setWizecoins] = useState<string | null>(null);
  const [picSource, setPicSource] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage here and update state variables
    setFirstName(localStorage.getItem('first'));
    setLastName(localStorage.getItem('last'));
    setWizecoins(localStorage.getItem('amountTokens'));
    setPicSource(localStorage.getItem('pic'));
    // ... other localStorage operations

    // Use the data as needed
  }, []); // Empty dependency array ensures this effect runs once after the initial render

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
            background: 'linear-gradient(rgba(0,0,0,0.5) 30%, transparent)',
            zIndex: '100',
          }}
        >
          <Box sx={{ position: 'relative', right: '3.3rem' }}>
            <ProfileInfo
              firstName={firstName}
              lastName={lastName}
              wizecoins={wizecoins}
              picSource={picSource}
            />
          </Box>
        </Box>
        <Box>{children}</Box>
      </Stack>
    </Stack>
  );
}
