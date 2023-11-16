'use client';

import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import Image from 'next/image';
import { WelcomeProps } from '@/app/components/types';
import styles from './sidenav.module.css';

export default function ProfileInfo({
  firstName,
  lastName,
  wizecoins,
}: WelcomeProps) {
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
          <Image src="/tommy.png" width="200" height="200" className={styles.images} alt="" />
        </Grid>
      </Grid>
    </Box>
  );
}
