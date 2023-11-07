/* eslint-disable @next/next/no-img-element */

'use client';

import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0/client';
import { WelcomeProps } from '@/app/components/types';
import styles from './sidenav.module.css';
import Awaiting from '@/app/components/awaiting';

export default function ProfileInfo({
  firstName,
  lastName,
  wizecoins,
}: WelcomeProps) {
  const { user, error } = useUser();

  if (error) return <div>{error.message}</div>;
  const pic:any = user?.picture;
  if (user) {
    console.log(user);
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
              {`${user.given_name} ${user.family_name}`}
            </Typography>
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
          </Grid>
          <Grid paddingLeft="1rem">
            <img src={pic} className={styles.images} alt="" />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
