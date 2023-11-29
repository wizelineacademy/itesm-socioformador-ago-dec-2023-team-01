'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import Image from 'next/image';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from 'react-redux';
import { WelcomeProps } from '@/app/components/types';
import styles from './sidenav.module.css';
import LogoutPopup from './logoutPopup';
import { setUserInfo } from '../../redux/features/userSlice';
import { AppDispatch } from '@/app/redux/store';

const numeral = require('numeral');

export function ProfileInfo({
  firstName,
  lastName,
  wizecoins,
  picSource,
}: WelcomeProps) {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenPopup = () => {
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    dispatch(setUserInfo(null));
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: 'calc(100vw - 16.5rem)',
        paddingTop: '1rem',
      }}
    >
      <LogoutPopup
        title={['Logout', '']}
        content={['You are about to ', 'Logout', ', proceed?']}
        badButtonTitle="Cancel"
        goodButtonTitle="Logout"
        open={isOpen}
        onClose={handleClosePopup}
        onGoodButtonClick={handleLogOut}
      />
      <Grid container justifyContent="flex-end">
        <Grid>
          <Typography
            sx={{ fontStyle: 'bold', color: 'white', fontSize: '1.2em' }}
          >
            {`${firstName} ${lastName}`}
          </Typography>
          <Stack
            gap={0}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Tooltip title="Logout">
              <IconButton sx={{ padding: '0', color: '#e93d44' }} onClick={handleOpenPopup}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            <Stack gap={0} direction="row" alignItems="center">
              <object
                data="/wizecoin.svg"
                className={styles.smallimage}
                title="wizecoin"
              />
              <Typography sx={{ color: '#4BE93D', fontSize: '1.2rem' }}>
                {Number(wizecoins) > 1000 ? numeral(wizecoins).format('0.0a') : wizecoins}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid paddingLeft="1rem">
          <Image unoptimized src={picSource} width="200" height="200" className={styles.images} alt="" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfileInfo;
