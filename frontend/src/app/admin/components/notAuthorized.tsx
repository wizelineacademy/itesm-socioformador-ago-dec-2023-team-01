import React, { useEffect, useState } from 'react';
import {
  Typography, Stack, Button, Avatar,
} from '@mui/material';
import styles from '../../components/iswelcome.module.css';

export default function NotAuthorized() {
  const [profileSrc, setProfileSrc] = useState('');
  useEffect(() => {
    setProfileSrc(`${localStorage.getItem('pic')}`);
  }, []);
  return (
    <Stack
      gap={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      minWidth="50px"
    >
      <Avatar sx={{ height: '175px', width: '175px' }} alt="Wizeliner" src={profileSrc} />
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
      <Button
        href="/welcome"
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
    </Stack>
  );
}
