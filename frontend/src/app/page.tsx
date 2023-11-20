'use client';

import React from 'react';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Image from 'next/image';
import styles from './page.module.css';
import TWButton from './components/TWButton';
import WTitle1 from './components/WTitle1';

export default function Home() {
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
                <Image width="200" height="200" src="/chatgpt.png" className={styles.smallImage} alt="" />
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Image width="200" height="200" src="/Bard.png" className={styles.smallImage} alt="" />
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Image width="200" height="200" src="/llama2.png" className={styles.smallImage} alt="" />
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
      <Grid xs={0} md={6}>
        <Image width="1000" height="1000" src="/inspiration.jpg" className={styles.image} alt="" />
      </Grid>
    </Grid>
  );
}
