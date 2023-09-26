import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

export default function ChatHistory() {
    const chats = [
        'Chat',
        'Chat',
        'Chat'
    ];

    return (
        <List>
            {chats.map((chat, index) => (
                <ListItem key={index}>
                    <Typography variant="body1">{chat}</Typography>
                </ListItem>
            ))}
        </List>
    );
}