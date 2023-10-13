import {Box, Grid, Typography, Stack} from '@mui/material'
import styles from './sidenav.module.css'
import { WelcomeProps } from '@/app/components/types'

export default function ProfileInfo({
    firstName,
    lastName,
    wizecoins
}: WelcomeProps) {
    return (
        <Box sx={{
            width: 'calc(100vw - 18rem)', paddingTop: '1rem'}}>
            <Grid container justifyContent={'flex-end'}>
                <Grid>
                    <Typography sx={{fontStyle: 'bold', color: 'white', fontSize:'25px'}}>{`${firstName} ${lastName}`}</Typography>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
                        <object data="/wizecoin.svg" className={styles.smallimage} title="wizecoin" />
                        <Typography sx={{color: '#4BE93D', fontSize:'25px'}}>{wizecoins}</Typography>
                    </Stack>
                </Grid>
                <Grid paddingLeft={'1rem'}>
                    <img src='/tommy.png' className={styles.images}/>
                </Grid>
            </Grid>
        </Box>
    )
}