//import React from "react"
"use-client";
import Stack from "@mui/material/Stack";
import ChatHeader from "@/app/components/ChatHeader";
import ChatHistory from "@/app/components/ChatHistory";
import ChatInput from "@/app/components/ChatInput";

function Mainpage() {
    return (
        <Stack spacing={2}>
            <ChatHeader />
            <ChatHistory />
            <ChatInput />
        </Stack>
    )
}

export default Mainpage;