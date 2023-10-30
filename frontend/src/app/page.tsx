'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import styles from './page.module.css';
import TWButton from './components/TWButton';
import WTitle1 from './components/WTitle1';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (user) {
    router.push('/welcome');
    console.log('user', user);
  }

  return (
    <Grid container spacing={0} className={styles.container}>
      <Grid xs={12} md={6} className={styles.container}>
        <div className={`${styles.center}`}>
          <WTitle1 text="Welcome to WIZE" redText="PROMPT." />
          <Link href="/api/auth/login">
            <TWButton text="Sign In with Google" />
          </Link>
          <div className={styles.spaceBetween}>
            <Grid container spacing={0}>
              <Grid
                xs={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img src="./chatgpt.png" className={styles.smallImage} alt="" />
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img src="./Bard.png" className={styles.smallImage} alt="" />
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img src="./llama2.png" className={styles.smallImage} alt="" />
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
      <Grid xs={0} md={6}>
        <img src="./inspiration.jpg" className={styles.image} alt="" />
      </Grid>
    </Grid>
  );
}
