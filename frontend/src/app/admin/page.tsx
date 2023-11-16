'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import WTitle1 from '../components/WTitle1';
import mockData from './components/data';
import Group from './components/group';

export default function Admin() {
  const recentUpdates = [
    {
      id: 1, title: 'Thomas Anderson', description: 'Gave 1,000 tokens to Software Engineers', imageUrl: '/tommy.png',
    },
    {
      id: 2, title: 'Thomas Anderson', description: 'Received 1,000 tokens for distribution', imageUrl: '/tommy.png',
    },
    {
      id: 3, title: 'Thomas Anderson', description: 'Request 1,000 tokens for distribution', imageUrl: '/tommy.png',
    },
  ];

  const tokenAnalytics = [
    {
      id: 1, title: 'OPEN AI', amount: '20,000', imageUrl: '/chatchat.png',
    },
    {
      id: 2, title: 'BARD', amount: '0', imageUrl: '/Bard.png',
    },
    {
      id: 3, title: 'LLAMA', amount: '0', imageUrl: '/llama2.png',
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box>
        <WTitle1 text="Dashboard." redText="" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Grid container padding="0rem 0 3rem 3rem" gap={4}>
            <Grid container padding="0rem 0 3rem 3rem" gap={4}>
              {mockData
                .map((group, index) => (
                  <Group key={index} {...group} />
                ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ position: 'sticky', top: 0 }}>
            <Card sx={{
              marginBottom: 2,
              backgroundColor: '#102A43',
              color: '#fff',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
              borderRadius: '20px',
            }}
            >
              <CardContent>
                <Typography variant="h6" style={{ color: '#fff' }}>Recent Updates</Typography>
                <List>
                  {recentUpdates.map((update) => (
                    <ListItem key={update.id}>
                      <ListItemAvatar>
                        <Avatar src={update.imageUrl} alt={update.title} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={update.title}
                        secondary={update.description}
                        primaryTypographyProps={{ style: { color: '#fff' } }}
                        secondaryTypographyProps={{ style: { color: '#fff' } }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
            {tokenAnalytics.map((token) => (
              <Card
                key={token.id}
                sx={{
                  marginBottom: 2,
                  backgroundColor: '#102A43',
                  color: '#fff',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
                  borderRadius: '20px',
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemAvatar>
                    <Avatar src={token.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={token.title}
                    secondary={`Amount: ${token.amount}`}
                    primaryTypographyProps={{ style: { color: '#fff' } }}
                    secondaryTypographyProps={{ style: { color: '#fff' } }}
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
