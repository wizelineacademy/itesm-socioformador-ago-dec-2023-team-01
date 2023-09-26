//import React from "react"
"use-client";
//@react server
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack";
import ChatHeader from "@/app/components/ChatHeader";
import Chat from "@/app/components/Chat";
import ChatInput from "@/app/components/ChatInput";
import ChatHistory from "@/app/components/ChatHistory";
import Navbar from "@/app/components/Navbar";

function Mainpage() {
    return (
        <Container>
            <Navbar profileSrc="./tommy.png"/>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <ChatHistory />
                </Grid>
                <Grid item xs={9}>
                    <ChatHeader />
                    <Chat/>
                    <ChatInput />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Mainpage;