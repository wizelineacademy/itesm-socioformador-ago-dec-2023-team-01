"use client";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";

interface ChatHistoryProps {
    closeChatHistory?: () => void;
}

export default function ChatHistory({ closeChatHistory }: ChatHistoryProps) {
    const chats = [
        'NextJS breakdown',
        'Responsive element',
        'Inner join explanation',
        'Prisma setup',
        'PostgresSQL shell',
        'Nvm in windows',
        'User response',
        'Best artist of 2023',
        'Best DB for next js',
        'Best framework',
        'OpenAI API'
    ];

    //const [openChatHistory, setOpenChatHistory] = useState(false);

    return (
        <Box sx={{ 
            backgroundColor: "#111823", 
            padding: "10px", 
            height: "70vh", 
            //overflowY: "auto",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column"
        }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="10px">
                <Box display="flex" alignItems="center">
                    <Button variant="outlined" startIcon={<AddIcon sx={{ color: "white" }}/>} sx={{
                        textTransform: "none",
                        borderRadius: "20px",
                        color: "white",
                        borderColor: "#4D545D",
                        "&:hover": {
                            borderColor: "white"
                        },
                        "&.Mui-focused": {
                            borderColor: "white"
                        },
                        "& .MuiTouchRipple-root span": {
                            backgroundColor: "white",
                        },
                    }}>
                        New Chat
                    </Button>
                </Box>
                <Box display="flex" justifyContent="flex-end" sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <IconButton color="inherit" onClick={closeChatHistory}>
                        <CloseIcon sx={{ color: 'white' }}/>
                    </IconButton>
                </Box>

                <Button variant="outlined" color="error" startIcon={<LogoutIcon />} sx={{
                    textTransform: "none",
                    borderRadius: "20px"
                }}>
                    Logout
                </Button>
            </Box>
            
            <Typography variant="h5" fontWeight="bold" textAlign="center" marginBottom="20px" color="error">
                HISTORY
            </Typography>

            <Box sx={{
                flexGrow: 1,
                overflowY: "auto",
                '&::-webkit-scrollbar': {
                    width: '7px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#4D545D',
                    borderRadius: '10px',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                },
                '&:hover::-webkit-scrollbar-thumb, &::-webkit-scrollbar-thumb:active': {
                    opacity: 1
                },
            }}>
                <Box sx={{ padding: "0 15px" }}>
                    <List>
                        {chats.map((chat, index) => (
                            <ListItem button key={index} sx={{ 
                                justifyContent: "space-between", 
                                marginBottom: "10px",
                                border: "1.5px solid #4D545D",
                                borderRadius: "10px",
                                //padding: "5px 10px",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis"
                            }}>
                                <Typography variant="body1" sx={{
                                    color: "white",
                                    flexGrow: 1,
                                    fontWeight: "bold",
                                    marginRight: "10px",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden"
                                }}>
                                    {chat}
                                </Typography>
                                <IconButton size="small" sx={{ color: "#4D545D" }}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>

            <Box display="flex" justifyContent="center" marginTop="20px">
                <Button variant="contained" color="error" sx={{
                    borderRadius: "5px",
                    textTransform: "none"
                }}>
                    Get Coins
                </Button>
            </Box>
        </Box>
    );
}