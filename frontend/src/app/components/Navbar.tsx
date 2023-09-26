import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import WTitle1 from './WTitle1';

interface NavbarProps {
    profileSrc: string; 
}

export default function Navbar({ profileSrc }: NavbarProps) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px">
            <WTitle1 text="Wize" redText="Line" />             
            <Avatar 
                alt="Profile Picture" 
                src={profileSrc}
            />
        </Box>
    );
}