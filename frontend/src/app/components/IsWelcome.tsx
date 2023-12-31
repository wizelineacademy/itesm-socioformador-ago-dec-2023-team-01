import React from 'react';
import {
  Typography, Box, Button, Tooltip, Avatar,
} from '@mui/material';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import LockClockIcon from '@mui/icons-material/LockClock';
import { useDispatch } from 'react-redux';
import styles from './iswelcome.module.css';
import { WelcomeProps } from './types';
import { AppDispatch } from '../redux/store';
import { setUserInfo } from '../redux/features/userSlice';

const numeral = require('numeral');

export default function IsWelcome({
  isAdmin,
  name,
  wizecoins,
  picSource,
}: WelcomeProps) {
  const nameParts = name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.splice(1).join(' ');
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
    }}
    >
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        <Grid container spacing={4} display="flex" justifyContent="center" alignItems="center">
          <Grid direction="column">
            <Avatar sx={{ height: '175px', width: '175px' }} alt="Wizeliner" src={picSource} />
          </Grid>
          <Grid>
            <Typography
              variant="h2"
              sx={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}
            >
              Welcome
              {' '}
              {isAdmin ? 'Administrator' : 'Wizeliner'}
              .
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', color: 'white' }}
              >
                {firstName}
                {' '}
                <span>{lastName}</span>
              </Typography>
              <Stack direction="row">
                <object data="./wizecoin.svg" className={styles.smallimage} title="wizecoin" />
                <Typography variant="h4" sx={{ color: '#4BE93D' }}>{Number(wizecoins) > 1000 ? numeral(wizecoins).format('0.0a') : wizecoins}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={7} display="flex" justifyContent="center" alignItems="center">
          <Grid>
            <Tooltip title="ChatGPT">
              <Link href="/mainpage">
                <Image width="200" height="200" src="/chatgptGreen.png" className={styles.roundedimage} alt="Chat GPT Green" />
              </Link>
            </Tooltip>
          </Grid>
          <Grid>
            <Tooltip title="Google Bard (comming soon)">
              <Box className={styles.container}>
                <Image
                  width="200"
                  height="200"
                  src="/Bard.png"
                  alt="Bard icon"
                  className={styles.blockedImage}
                />
                <Box className={styles.overlay}>
                  <LockClockIcon
                    sx={{ fontSize: '7rem', padding: '2.7rem 0 0 3.3rem', color: 'white' }}
                  />
                </Box>
              </Box>
            </Tooltip>
          </Grid>
          <Grid>
            <Tooltip title="Meta Llama2 (comming soon)">
              <Box className={styles.container}>
                <Image
                  width="200"
                  height="200"
                  src="/llama2.png"
                  alt="Llama icon"
                  className={styles.blockedImage}
                />
                <Box className={styles.overlay}>
                  <LockClockIcon
                    sx={{ fontSize: '7rem', padding: '2.7rem 0 0 3.3rem', color: 'white' }}
                  />
                </Box>
              </Box>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid spacing={4} container display="flex" justifyContent="center" alignItems="center">
          {/* <Grid>
            <Typography
              variant="h6"
              sx={{ color: 'white' }}
            >
              Not you?
              {' '}
              <Link
                href="/api/auth/logout"
                className={styles.return}
                onClick={() => {
                  dispatch(setUserInfo(null));
                }}
              >
                Return to Sign-in
              </Link>
            </Typography>
          </Grid> */}
          <Grid>
            {isAdmin
              && (
                <Link href="/admin">
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
                    {' '}
                    Go to Dashboard
                  </Button>
                </Link>
              )}
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
