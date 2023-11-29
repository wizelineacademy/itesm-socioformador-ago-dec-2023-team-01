import React from 'react';
import {
  Typography, Stack, Button,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import styles from './iswelcome.module.css';

export default function NotWelcome() {
  return (
    <Stack
      gap={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      minWidth="50px"
    >
      <Image width="200" height="200" src="/notWizeliner.jpg" className={styles.image} alt="" />
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '4vw',
          color: 'white',
        }}
        className={styles.notwizelinertext}
      >
        Not a Wizeliner...
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
        We are sorry. This tool can only be used by
        {' '}
        <span>Wizeline</span>
        {' '}
        employees.
      </Typography>
      <Link href="/">
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
          Return to Sign In
        </Button>
      </Link>
    </Stack>
  );
}
