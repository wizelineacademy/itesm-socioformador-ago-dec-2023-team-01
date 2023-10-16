import React from 'react';
import {
  Typography, Box, Button, Paper,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Stack from '@mui/material/Stack';
import { Inter } from 'next/font/google';
import styles from './iswelcome.module.css';

const inter = Inter({ subsets: ['latin'] });

interface ProfileInformationProps {
  firstName: string;
  lastName: string;
  email: string;
  areas: string;
  currentWizecoins: string;
  monthlyWizecoins: string;
}

export default function UserProfile({
  firstName,
  lastName,
  email,
  areas,
  currentWizecoins,
  monthlyWizecoins,
}: ProfileInformationProps) {
  const [emailPartBeforeAt, emailPartAfterAt] = email.split('@');

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
    }}
    >
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        <Grid direction="column">
          <img src="./mockWizeliner.jpg" className={styles.image} alt="Mock Wizeliner" />
        </Grid>
        <Grid>
          <Stack direction="column" justifyContent="space-between">
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', color: 'white' }}
              className={`${inter.className}`}
            >
              {firstName}
              {' '}
              <span>{lastName}</span>
            </Typography>
          </Stack>
        </Grid>

        <Paper elevation={0} style={{ borderRadius: '10px', background: 'linear-gradient(#111823, #172339)' }}>
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 30px', paddingTop: '1rem', paddingBottom: '3rem', width: '600px', height: '300px',
          }}
          >
            <Stack direction="column" justifyContent="space-between" spacing={3}>
              <Stack direction="row" justifyContent="right" alignItems="center">
                <Typography variant="body1" sx={{ color: 'white' }} className={`${inter.className}`}>
                  Email
                </Typography>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  border: '1px solid grey', /* Change 'dashed' to 'solid' */
                  borderRadius: '8px',
                  margin: '0 10px', /* Add margin for spacing between elements */
                  width: '500px', /* Set the width to your desired size */
                  height: '40px', /* Set the height to your desired size */
                }}
                >
                  <Typography variant="body1" sx={{ color: 'white', margin: '0 10px' }} className={`${inter.className}`}>
                    {emailPartBeforeAt}
                    <span>
                      @
                      {emailPartAfterAt}
                    </span>
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" justifyContent="right" alignItems="center">
                <Typography variant="body1" sx={{ color: 'white' }} className={`${inter.className}`}>
                  Area(s)
                </Typography>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  border: '1px solid grey', /* Change 'dashed' to 'solid' */
                  borderRadius: '8px',
                  margin: '0 10px', /* Add margin for spacing between elements */
                  width: '500px', /* Set the width to your desired size */
                  height: '40px', /* Set the height to your desired size */
                }}
                >
                  <Typography variant="body1" sx={{ color: 'white', margin: '0 10px' }} className={`${inter.className}`}>
                    {areas}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" justifyContent="center" spacing={18}>
                <Stack direction="column" justifyContent="center" alignItems="center">
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', color: 'white' }}
                    className={`${inter.className}`}
                  >
                    Current Wize
                    <span>coins</span>
                  </Typography>
                  <Stack direction="row">
                    <object data="./wizecoin.svg" className={styles.smallimage} title="wizecoin" />
                    <Typography variant="h4" sx={{ color: '#4BE93D' }} className={`${inter.className}`}>{currentWizecoins}</Typography>
                  </Stack>
                </Stack>
                <Stack direction="column" justifyContent="center" alignItems="center">
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', color: 'white' }}
                    className={`${inter.className}`}
                  >
                    Wize
                    <span>coin</span>
                    {' '}
                    Monthly reset
                  </Typography>
                  <Stack direction="row">
                    <object data="./wizecoin.svg" className={styles.smallimage} title="wizecoin" />
                    <Typography variant="h4" sx={{ color: '#4BE93D' }} className={`${inter.className}`}>{monthlyWizecoins}</Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Box sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}
              >
                <Button
                  style={{
                    color: 'white',
                    backgroundColor: '#E93D44',
                    borderRadius: '8px', // Add the border radius to the button
                    textTransform: 'none', // Set textTransform to 'none' to prevent all caps
                    padding: '0px 12px',
                  }}
                >
                  <Typography variant="h6" sx={{ color: 'white' }} className={`${inter.className}`}>Return</Typography>
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}
