'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Avatar,
} from '@mui/material';
import Image from 'next/image';
import SettingsIcons from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { WelcomeProps } from '@/app/components/types';
import LogoutPopup from '@/app/admin/components/logoutPopup';

const numeral = require('numeral');

export function TopNavbar({
  firstName,
  lastName,
  wizecoins,
  picSource,
}: WelcomeProps) {
  const [isOpen, setOpen] = useState(false);
  const handleOpenPopup = () => {
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    localStorage.clear();
    setOpen(false);
  };

  return (
    <Box
      sx={{
        padding: '0.5rem 3rem 0.5rem 0',
      }}
    >
      <LogoutPopup
        title={['Logout', '']}
        content={['You are about to ', 'Logout', ', proceed?']}
        badButtonTitle="Cancel"
        goodButtonTitle="Logout"
        open={isOpen}
        onClose={handleClosePopup}
        onGoodButtonClick={handleLogOut}
      />
      <Stack direction="row" justifyContent="space-between">
        {/* Wizeprompt Logo and Title */}
        <Stack direction="row" alignItems="center" gap={1}>
          {/* Wizeprompt logo */}
          <Box sx={{ paddingLeft: '2rem' }}>
            <Image
              width={55}
              height={40}
              unoptimized
              src="/wizeline.png"
              alt="wizeline logo"
            />
          </Box>
          {/* Wizeprompt typography */}
          <Typography color="white" variant="h5" fontWeight="bold">
            WIZE
            <span>
              PROMPT
            </span>
          </Typography>
        </Stack>
        {/* profile information */}
        <Stack direction="row" gap={2}>
          {/* Profile Information */}
          <Stack>
            {/* UserName */}
            <Typography
              sx={{ fontStyle: 'bold', color: 'white', fontSize: '1.2em' }}
            >
              {`${firstName} ${lastName}`}
            </Typography>
            {/* Wizecoins and Logout */}
            <Stack direction="row" justifyContent="space-between">
              {/* Logout */}
              <Tooltip title="Logout">
                <IconButton sx={{ padding: '0', color: '#e93d44' }} onClick={handleOpenPopup}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
              {/* Wizecoin logo and amount */}
              <Stack gap={1} direction="row">
                <Box sx={{ position: 'relative', top: '3px' }}>
                  <Image
                    src="wizecoin.svg"
                    alt="Wizecoin Icon"
                    width={18}
                    height={18}
                    layout="fixed"
                  />
                </Box>
                <Typography sx={{ color: '#4BE93D', fontSize: '1.2rem' }}>
                  {Number(wizecoins) > 1000 ? numeral(wizecoins).format('0.0a') : wizecoins}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {/* User Profile Picture */}
          <Box position="relative">
            <Avatar
              alt={`${firstName} ${lastName}`}
              src={picSource}
              sx={{
                width: 50, height: 50, position: 'relative', top: '5px',
              }}
            />
            <IconButton
              href="/profile"
              size="small"
              sx={{
                position: 'absolute',
                left: 35,
                bottom: 0,
                backgroundColor: 'white',
                color: 'black',
                width: 20,
                height: 20,
              }}
            >
              <SettingsIcons />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default TopNavbar;
