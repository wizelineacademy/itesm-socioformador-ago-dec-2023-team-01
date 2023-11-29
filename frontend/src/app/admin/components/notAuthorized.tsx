import React, { useEffect, useState } from 'react';
import {
  Typography, Stack, Button, Avatar,
} from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styles from '../../components/iswelcome.module.css';
import { RootState } from '@/app/redux/store';

export default function NotAuthorized() {
  const user = useSelector((state: RootState) => state.user.userInfo);
  return (
    <Stack
      gap={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      minWidth="50px"
    >
      <Avatar sx={{ height: '175px', width: '175px' }} alt="Wizeliner" src={user?.picture} />
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '4vw',
          color: 'white',
        }}
        className={styles.notwizelinertext}
      >
        Not an administrator...
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'white',
          fontSize: '1.5vw',
          padding: 'none',
          maxWidth: '32vw',
          minWidth: '220px',
          paddingBottom: '4vh',
        }}
        className={styles.apologytext}
      >
        We are sorry. This section of the application can only be used by
        {' '}
        <span>administrators.</span>
      </Typography>
      <Link href="/welcome">
        <Button
          variant="contained"
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            bgcolor: '#E93D44',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: 'red',
            },
          }}
        >
          Return to welcome
        </Button>
      </Link>
    </Stack>
  );
}
