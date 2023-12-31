'use client';

import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import SettingsIcons from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
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
      height={{
        xs: '6vh', sm: '6vh', md: '6vh', lg: '5vh',
      }}
    >
      {/* display on larger screens, hidden on small screens */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <WTitle1 text="Wize" redText="Prompt" variantBig={false} paddings={false} />
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
          <Typography variant="body1" fontWeight="bold" color="white">
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
                width={18}
                height={18}
                layout="fixed"
              />
            </Box>
            <Typography variant="body2" color="#4BE93D">{number}</Typography>
          </Box>
        </Box>

        <Box position="relative">
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={profileSrc}
            sx={{ width: 45, height: 45 }}
          />
          <Link href="/profile">
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                left: 30,
                bottom: -5,
                backgroundColor: 'white',
                color: 'black',
                width: 20,
                height: 20,
              }}
            >
              <SettingsIcons />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
