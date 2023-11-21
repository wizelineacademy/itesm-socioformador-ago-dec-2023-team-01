'use client';

import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import SettingsIcons from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
// import WizecoinIcon from "./wizecoin.svg";
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import WTitle1 from './WTitle1';

interface NavbarProps {
  profileSrc: any;
  name: any;
  number: string | number;
  onBurgerClick: () => void;
}

export default function Navbar({
  profileSrc,
  name,
  number,
  onBurgerClick,
}: NavbarProps) {
  const nameParts = name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.splice(1).join(' ');

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="10px"
    >
      {/* display on larger screens, hidden on small screens */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <WTitle1 text="Wize" redText="Prompt" />
      </Box>

      {/* burger icon - display only on small screens */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={onBurgerClick}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <MenuIcon fontSize="large" sx={{ color: 'white' }} />
      </IconButton>

      <Box display="flex" alignItems="center">
        <Box marginRight="10px" display="flex" flexDirection="column">
          <Typography variant="h6" fontWeight="bold" color="white">
            {firstName}
            {' '}
            {lastName}
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignSelf="flex-end"
            alignItems="center"
          >
            <Box sx={{ marginRight: '5px' }}>
              <Image
                src="wizecoin.svg"
                alt="Wizecoin Icon"
                width={20}
                height={20}
                layout="fixed"
              />
            </Box>
            <Typography color="#4BE93D">{number}</Typography>
          </Box>
        </Box>

        <Box position="relative">
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={profileSrc}
            sx={{ width: 56, height: 56 }}
          />
          <IconButton
            href="/profile"
            size="small"
            sx={{
              position: 'absolute',
              left: 30,
              bottom: -10,
              backgroundColor: 'white',
              color: 'black',
            }}
          >
            <SettingsIcons />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
