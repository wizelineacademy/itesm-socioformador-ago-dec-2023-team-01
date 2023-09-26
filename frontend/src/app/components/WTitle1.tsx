import { Typography } from '@mui/material';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface Title1Props {
    text: String;
    redText: String;
}

export default function WTitle1({text, redText}:Title1Props) {
    return(
        <Typography
        variant='h1'
            sx={{
                color: 'white',
                fontWeight: 'bold',
                paddingTop: '4rem',
                paddingBottom: '3rem',
            }}
        className={`${inter.className} testing`}
        >{text}<span>{redText}</span></Typography>
    );
}