"use-client";
import { Paper, Typography } from "@mui/material";

export default function ChatHistory() {
    const messages = [
        { from: 'user', text: 'Hello ChatGPT!' },
        { from: 'chatgpt', text: 'Hello! How can I assist you today?' }
    ];

    return (
        <Paper style={{ maxHeight: '400px', overflowY: 'scroll', padding: '10px' }}>
            {messages.map((message, index) => (
                <div key={index} style={{ textAlign: message.from === 'chatgpt' ? 'left': 'right'}}>
                    <Typography variant="body1">{message.text}</Typography>
                </div>
            ))}
        </Paper>
    );
}