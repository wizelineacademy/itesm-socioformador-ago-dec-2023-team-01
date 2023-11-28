'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import {
  Line,
  Pie,
  Bar,
} from 'react-chartjs-2';
import { fetchDashboard } from '@/services/dashboardService';
import WTitle1 from '../components/WTitle1';
import mockData from './components/data1';
import Group from './components/group1';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function Admin() {
  const data = fetchDashboard();
  console.log(data);
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

  const tokenUsageData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Token Usage',
        data: [0, 200, 800, 300, 750, 200, 500],
        fill: true,
        backgroundColor: '#E93D44',
        borderColor: '#E93D44',
      },
    ],
  };

  const teamUsageData = {
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F'],
    datasets: [
      {
        label: 'Token Usage per Team',
        data: [300, 200, 100, 400, 250, 100],
        backgroundColor: [
          '#E93D44',
          '#AE282C',
          '#E93D44',
          '#AE282C',
          '#E93D44',
          '#AE282C',
        ],
        hoverBackgroundColor: [
          '#E7E9ED',
          '#E7E9ED',
          '#E7E9ED',
          '#E7E9ED',
          '#E7E9ED',
        ],
      },
    ],
  };

  const responseTimeWeeklyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Average Response Time (ms)',
        data: [120, 110, 100, 80],
        backgroundColor: '#E93D44',
        borderColor: '#fff',
        borderWidth: 1,
        // barThickness: 10,
        // categoryPercentage: 0.9,
        // barPercentage: 1.1,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    scales: {
      x: {
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          padding: 2,
        },
      },
    },
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        // position: 'left' as const,
      },
    },
  };

  const errorRateData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Error Rate',
        data: [5, 10, 2, 3, 7, 4, 1],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Tokens Used',
        data: [20, 3, 3, 40, 4, 4, 40],
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Container maxWidth="xl">
      <Box marginLeft="100px">
        <WTitle1 text="Dashboard." redText="" variantBig paddings />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          {/* dona */}
          <Grid container padding="0rem 0 0 3rem" gap={4}>
            <Grid container padding="0rem 0 3rem 3rem" gap={4}>
              {mockData
                .map((group, index) => (
                  <Group key={index} {...group} />
                ))}
            </Grid>
          </Grid>
          {/* line chart */}
          <Grid padding="0rem 3rem 3rem 5rem" gap={4}>
            <Card sx={{
              margin: '20px',
              padding: '20px',
              backgroundColor: '#000',
              color: '#fff',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
              borderRadius: '20px',
            }}
            >
              <Typography variant="h5">Daily Token Usage</Typography>
              <Line data={tokenUsageData} />
            </Card>
          </Grid>
          {/* pie chart y bar chart */}
          <Grid container padding="0rem 4rem 3rem 6rem" gap={0}>
            <Grid item xs={6} md={6}>
              <Card sx={{
                margin: '5px',
                padding: '5px',
                backgroundColor: '#000',
                color: '#fff',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
                borderRadius: '20px',
              }}
              >
                <CardContent>
                  <Typography variant="h5">Token Usage Per Team</Typography>
                  <Pie data={teamUsageData} options={pieChartOptions} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={6}>
              <Card sx={{
                margin: '5px',
                padding: '5px',
                backgroundColor: '#000',
                color: '#fff',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
                borderRadius: '20px',
                // height: '460px',
              }}
              >
                <CardContent>
                  <Typography variant="h5">Average Response Time</Typography>
                  <Bar data={responseTimeWeeklyData} options={options} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid padding="0rem 3rem 3rem 5rem" gap={4}>
            <Card sx={{
              margin: '20px',
              padding: '20px',
              backgroundColor: '#000',
              color: '#fff',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
              borderRadius: '20px',
            }}
            >
              <CardContent>
                <Typography variant="h5">Weekly Error Rate</Typography>
                <Line data={errorRateData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* menu derecha */}
        <Grid item xs={12} md={3}>
          <Box sx={{ position: 'sticky', top: 0 }}>
            <Card sx={{
              marginBottom: 2,
              backgroundColor: '#000',
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
                  backgroundColor: '#000',
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
