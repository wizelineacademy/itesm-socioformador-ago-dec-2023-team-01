"use-client";
import { Avatar, Typography } from '@mui/material';

export default function ChatHeader() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px'}}>
            <Avatar
                alt="Profile Picture"
                src="./tommy.png"
                sx={{
                    width: 50,
                    height: 50,
                    marginRight: '10px'
                }}
            />
            <Typography variant="h6">ChatGPT</Typography>
        </div>
    )
}
