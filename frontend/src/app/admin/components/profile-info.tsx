'use client';

import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Inter } from 'next/font/google';
import styles from './sidenav.module.css';

const inter = Inter({ subsets: ['latin'] });

function ProfileInfo({
  firstName,
  lastName,
  wizecoins,
  picSource,
}:any) {
  return (
    <Box
      sx={{
        width: 'calc(100vw - 16.1rem)',
        paddingTop: '1rem',
      }}
    >
      <Grid container justifyContent="flex-end">
        <Grid>
          <Typography
            sx={{ fontStyle: 'bold', color: 'white', fontSize: '25px' }}
          >
            {`${firstName} ${lastName}`}
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Stack
              gap={0}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid>
                <Button
                  href="/welcome"
                  sx={{
                    textTransform: 'none',
                  }}
                  className={`${inter.className}`}
                  startIcon={<LogoutIcon sx={{ color: '#E93D44' }} />}
                >
                  <Typography
                    sx={{ fontStyle: 'bold', color: '#E93D44', fontSize: '18px' }}
                  >
                    Logout
                  </Typography>
                </Button>

              </Grid>
            </Stack>
            <Stack
              gap={0}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <object
                data="/wizecoin.svg"
                className={styles.smallimage}
                title="wizecoin"
              />
              <Typography sx={{ color: '#4BE93D', fontSize: '25px' }}>
                {wizecoins}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid paddingLeft="1rem">
          <img src={picSource} className={styles.images} alt="" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfileInfo;
