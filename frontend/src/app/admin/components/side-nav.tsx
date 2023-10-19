'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import Image from 'next/image';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';

const sidebarItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: DashboardIcon,
  },
  {
    name: 'Groups',
    href: '/admin/groups',
    icon: GroupsIcon,
  },
  {
    name: 'Wizeliners',
    href: '/admin/wizeliners',
    icon: PersonIcon,
  },
];

export default function Sidebar() {
  return (
    <Stack
      sx={{ backgroundColor: '#111823', width: '15rem', height: '100%' }}
      justifyContent="space-between"
    >
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
          padding="2rem"
        >
          <Image src="/wizeline.png" width={55} height={40} alt="logo" />
          <Typography color="white" variant="h5" fontWeight="bold">
            WIZE
            <span>
              PROMPT
            </span>
          </Typography>
        </Stack>
        <Stack gap={1} alignItems="center">
          {sidebarItems.map(({ name, href, icon: Icon }) => (
            <Button
              href={href}
              key={name}
              variant="outlined"
              sx={{
                width: '13rem',
                textTransform: 'none',
                color: 'rgba(236,236,249,0.4)',
                borderColor: '#2A323F',
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                width="100%"
              >
                <Icon />
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    fontStyle: 'bold',
                    paddingLeft: '0.5rem',
                  }}
                >
                  {name}
                </Typography>
              </Stack>
            </Button>
          ))}
        </Stack>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="2rem"
      >
        <Button
          variant="contained"
          href="/welcome"
          sx={{
            bgcolor: '#E93D44',
            '&:hover': { bgcolor: 'red' },
          }}
        >
          Exit Dashboard
        </Button>
      </Box>
    </Stack>
  );
}
