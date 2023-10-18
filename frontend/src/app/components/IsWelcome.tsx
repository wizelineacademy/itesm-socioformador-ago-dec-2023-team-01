import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Stack from '@mui/material/Stack';
import styles from './iswelcome.module.css';
import { WelcomeProps } from './types';

export default function IsWelcome({
  admin,
  firstName,
  lastName,
  wizecoins,
}: WelcomeProps) {
  return (
    
    <Box sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
    }}
    >
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        <Grid container spacing={4} display="flex" justifyContent="center" alignItems="center">
          <Grid direction="column">
            <img src="./mockWizeliner.jpg" className={styles.image} alt="Mock Wizeliner" />
          </Grid>
          <Grid>
            <Typography
              variant="h2"
              sx={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}
            >
              Welcome
              {' '}
              {admin ? 'Administrator' : 'Wizeliner'}
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
                <Typography variant="h4" sx={{ color: '#4BE93D' }}>{wizecoins}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={7} display="flex" justifyContent="center" alignItems="center">
          <Grid>
            <img src="./chatgptGreen.png" className={styles.roundedimage} alt="Chat GPT Green" />
          </Grid>
          <Grid>
            <img src="./Bard.png" className={styles.roundedimage} alt="Bard" />
          </Grid>
          <Grid>
            <img src="./llama2.png" className={styles.roundedimage} alt="Llama 2" />
          </Grid>
        </Grid>
        <Grid spacing={4} container display="flex" justifyContent="center" alignItems="center">
          <Grid>
            <Typography
              variant="h6"
              sx={{ color: 'white' }}
            >
              Not you?
              {' '}
              <Link href="/api/auth/logout" className={styles.return}>Return to Sign-in</Link>
            </Typography>
          </Grid>
          <Grid>
            {admin
                        && (
                        <Button
                          variant="contained"
                          href="/admin"
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
                        )}
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
