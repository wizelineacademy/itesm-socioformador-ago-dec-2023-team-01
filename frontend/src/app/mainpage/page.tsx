//import React from "react"
"use client";
//@react server
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack";
import ChatHeader from "@/app/components/ChatHeader";
import Chat from "@/app/components/Chat";
import ChatInput from "@/app/components/ChatInput";
import ChatHistory from "@/app/components/ChatHistory";
import Navbar from "@/app/components/Navbar";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import React, { useState } from "react";
import { Hidden } from "@mui/material";

function Mainpage() {

    const [showChatHistory, setShowChatHistory] = useState(false);

    return (
        <Container>
            <Navbar profileSrc="./tommy.png" name="Thomas" surname="Anderson" number="9891" onBurgerClick={() => setShowChatHistory(prev => !prev)}/>
            
            <Grid container spacing={1}>
                {/* ChatHistory for larger screens (displayed by default) */}
                <Hidden only={['xs']}>
                    <Grid item sm={3}>
                        <ChatHistory />
                    </Grid>
                </Hidden>
                
                <Grid item xs={12} sm={9}>
                    <Chat/>
                </Grid>

                {/* ChatHistory for small screens (hidden by default and displayed on burger icon click) */}
                <Hidden mdUp>
                {showChatHistory && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // semi-transparent backdrop
                    }}>
                        <ChatHistory closeChatHistory={() => setShowChatHistory(false)} />
                    </div>
                )}
                </Hidden>

                <Hidden smUp>
                {showChatHistory && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}>
                        <ChatHistory closeChatHistory={() => setShowChatHistory(false)} />
                    </div>
                )}
            </Hidden>
            </Grid>
        </Container>
    )
}

export default Mainpage;