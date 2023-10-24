'use client';

import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import styles from './sidenav.module.css';
import { WelcomeProps } from '@/app/components/types';

export default function ProfileInfo({
    name,
    wizecoins,
    picSource
}: WelcomeProps) {
  const nameParts = name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.splice(1).join(' ');
  return (
    <Box 
      sx={{
        width: 'calc(100vw - 16.1rem)', 
        paddingTop: '1rem',
      }}
    >
      <Grid container justifyContent={'flex-end'}>
        <Grid>
          <Typography
            sx={{fontStyle: 'bold', color: 'white', fontSize:'25px'}}
          >
            {`${firstName} ${lastName}`}
          </Typography>
          <Stack 
            gap={0}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
          >
            <object
              data="/wizecoin.svg"
              className={styles.smallimage}
              title="wizecoin"
            />
            <Typography sx={{color: '#4BE93D', fontSize:'25px'}}>
              {wizecoins}
            </Typography>
          </Stack>
        </Grid>
          <Grid paddingLeft={'1rem'}>
              <img src={picSource} className={styles.images}/>
          </Grid>
      </Grid>
    </Box>
  );
}
