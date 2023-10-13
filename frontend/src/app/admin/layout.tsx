"use client"
import { Box, Stack } from "@mui/material";
import SideNav from "./components/side-nav";
import Grid from '@mui/material/Unstable_Grid2';
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
      <Grid container direction={'row'}>
        <Grid>
          <Box sx={{
            display: 'flex',
            height: '100vh',
            gap: '2rem',
            margin: '0',
          }}>
            <SideNav />
          </Box>
        </Grid>
        <Grid>
          <Stack>
            <ProfileInfo {...wizeliner} />
            <Box>
              {children}
            </Box>
          </Stack>
        </Grid>
      </Grid>

    );
  }