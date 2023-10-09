// "use-client";
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function ChatHeader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
      <Avatar
        alt="Profile Picture"
        src="./chatgpt.png"
        sx={{
          width: 50,
          height: 50,
          marginRight: '10px',
        }}
      />
      <Typography variant="h6">ChatGPT</Typography>
    </div>
  );
}
