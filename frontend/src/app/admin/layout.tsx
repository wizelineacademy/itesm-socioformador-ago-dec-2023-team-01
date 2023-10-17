"use client"
import { Box, Stack } from "@mui/material";
import SideNav from "./components/side-nav";
import ProfileInfo from "./components/profile-info";
import { WelcomeProps } from "../components/types";

export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const wizeliner: WelcomeProps = {
      admin: true,
      firstName: 'Thomas',
      lastName: 'Anderson',
      wizecoins: '120',
      IsWizeliner: true,
    };

    return (
      <Stack direction={'row'}>
        <Box sx={{height: '100vh', position: 'sticky', top: '0'}}>
          <SideNav/>
        </Box>
        <Stack>
          <Box sx={{position: 'sticky', top: '0', background: 'linear-gradient(rgba(0,0,0,0.5) 30%, transparent)', zIndex:'100'}}>
            <Box sx={{position: 'relative', right:'3.3rem'}}>
              <ProfileInfo {...wizeliner} />
            </Box>
          </Box>
          <Box>{children}</Box>
        </Stack>
      </Stack>
    );
  }