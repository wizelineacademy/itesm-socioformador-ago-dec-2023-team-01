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
import styles from './sidenav.module.css';
import { Inter } from 'next/font/google';

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
          <Stack
            gap={0}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid paddingRight="10rem">
              <Button
                style={{
                  textTransform: 'none', // Set textTransform to 'none' to prevent all caps
                }}
                className={`${inter.className}`}
                startIcon={<LogoutIcon />}
              >
                <Typography
                  sx={{ fontStyle: 'bold', color: 'white', fontSize: '18px' }}
                >
                  <span>Logout</span>
                </Typography>
              </Button>

            </Grid>

            <object
              data="/wizecoin.svg"
              className={styles.smallimage}
              title="wizecoin"
            />
            <Typography sx={{ color: '#4BE93D', fontSize: '25px' }}>
              {wizecoins}
            </Typography>
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
