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
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import LogoutPopup from '@/app/admin/components/logoutPopup';
import { AppDispatch } from '@/app/redux/store';
import { resetUser } from '@/app/redux/features/userSlice';

const numeral = require('numeral');

export function TopNavbar({
  firstName,
  lastName,
  wizecoins,
  picSource,
}: {
  firstName:string,
  lastName:string,
  wizecoins:number,
  picSource:string,
}) {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleOpenPopup = () => {
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    dispatch(resetUser());
    setOpen(false);
  };

  return (
    <Box
      sx={{
        padding: '0.5rem 3rem 0.5rem 0', backgroundColor: 'rgba(17, 24, 35, 0.4)', height: '50px',
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
              width={42}
              height={30}
              unoptimized
              src="/wizeline.png"
              alt="wizeline logo"
            />
          </Box>
          {/* Wizeprompt typography */}
          <Typography color="white" fontWeight="bold" fontSize="25px">
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
              sx={{ fontStyle: 'bold', color: 'white', fontSize: '1em' }}
            >
              {`${firstName} ${lastName}`}
            </Typography>
            {/* Wizecoins and Logout */}
            <Stack direction="row" justifyContent="space-between">
              {/* Logout */}
              <Tooltip title="Logout">
                <IconButton sx={{ padding: '0', color: '#e93d44' }} onClick={handleOpenPopup}>
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              {/* Wizecoin logo and amount */}
              <Stack gap={1} direction="row">
                <Box sx={{ position: 'relative', top: '4px' }}>
                  <Image
                    src="wizecoin.svg"
                    alt="Wizecoin Icon"
                    width={15}
                    height={15}
                    layout="fixed"
                  />
                </Box>
                <Typography sx={{ color: '#4BE931', fontSize: '1rem' }}>
                  {Number(wizecoins) > 1000 ? numeral(wizecoins).format('0.0a') : wizecoins}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {/* User Profile Picture */}
          <Link href="/profile">
            <Tooltip title="Settings" arrow>
              <Box position="relative">
                <Avatar
                  alt={`${firstName} ${lastName}`}
                  src={picSource}
                  sx={{
                    width: 45, height: 45, position: 'relative', border: '1.5px solid #e93d44', boxSizing: 'content-box',
                  }}
                />
              </Box>
            </Tooltip>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}

export default TopNavbar;
