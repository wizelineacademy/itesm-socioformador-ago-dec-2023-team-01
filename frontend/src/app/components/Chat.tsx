//"use-client";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Chat() {
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