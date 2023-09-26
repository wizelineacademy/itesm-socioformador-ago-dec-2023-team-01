"use client"
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import styles from './page.module.css';
import TWButton from './components/TWButton';
import WTitle1 from './components/WTitle1';


export default function Home() {
  return (
    <Grid container spacing={0} className={styles.container}>
      <Grid xs={12} md={6} className={styles.container}>
          <div className={`${styles.center}`}>
              <WTitle1 text={'Welcome to WIZE'} redText={'PROMPT.'}/>
              <TWButton text={'Sign In with Google'}/>
              <div className={styles.spaceBetween}>
                  <Grid container spacing={0}>
                      <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
                          <img src="./chatgpt.png" className={styles.smallImage}/>
                      </Grid>
                      <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
                          <img src="./Bard.png" className={styles.smallImage}/>
                      </Grid>
                      <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
                          <img src="./llama2.png" className={styles.smallImage}/>
                      </Grid>
                  </Grid>
              </div>
          </div>
      </Grid>
      <Grid xs={0} md={6}>
          <img src="./inspiration.jpg" className={styles.image}/>
      </Grid>
      </Grid>
  )
}
