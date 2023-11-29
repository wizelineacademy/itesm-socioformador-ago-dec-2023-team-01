'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import Link from 'next/link';

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

export default function SideNavbar() {
  return (
    <Stack
      sx={{ backgroundColor: '#111823', width: '15rem', height: '100%' }}
      justifyContent="space-between"
    >
      <Box>
        <Stack justifyContent="center" alignItems="center" padding="1rem 0 1rem 0">
          <Typography color="white" variant="h5" fontWeight="bold">
            <span>
              HISTORY
            </span>
          </Typography>
        </Stack>
        <Stack gap={1} alignItems="center">
          {sidebarItems.map(({ name, href, icon: Icon }) => (
            <Link href={href}>
              <Button
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
            </Link>
          ))}
        </Stack>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="2rem"
      >
        <Link href="/welcome">
          <Button
            variant="contained"
            sx={{
              bgcolor: '#E93D44',
              '&:hover': { bgcolor: 'red' },
            }}
          >
            Return Home
          </Button>
        </Link>
      </Box>
    </Stack>
  );
}
