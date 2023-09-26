"use-client";
import { Button, TextField } from "@mui/material";

export default function ChatInput() {
    return (
        <div style={{ display: 'flex', padding: '10px' }}>
            <TextField 
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
            />
            <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: '10px' }}
            >
                Send
            </Button>
        </div>
    );
}