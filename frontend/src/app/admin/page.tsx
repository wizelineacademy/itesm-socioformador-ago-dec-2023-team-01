'use client';

import React,
{
  useState,
  useEffect,
  ReactNode,
} from 'react';
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
  ChartData,
  Filler,
} from 'chart.js';
import {
  Line,
  Pie,
  Bar,
} from 'react-chartjs-2';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import TokenIcon from '@mui/icons-material/Token';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import SendIcon from '@mui/icons-material/Send';
import WTitle1 from '../components/WTitle1';
import { fetchDashboard } from '@/services/dashboardService';

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
  Filler,
);

export default function Admin() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchDashboard()
      .then((data) => {
        setDashboardData(data);
        console.log(data);
      })
      .catch((error) => console.error('Error fetching dashboard data: ', error));
  }, []);

  if (!dashboardData) {
    return <div>LOADING...</div>;
  }

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
        data: [7678, 5033, 7340, 3455, 2390, 7637, 8378],
        fill: true,
        borderColor: '#E93D44',
      },
    ],
  };

  interface GroupInfo {
    availableTokens: number;
    group: {
      area: string;
      createdAt: string;
      id: number;
      name: string;
      updatedAt: string;
    };
    numberOfUsers: number;
    totalTokens: number;
  }

  interface UsersInfo {
    amount: number;
    currentAmount: number;
    user: {
      createdAt: string;
      email: string;
      firstName: string;
      id: string;
      imageUrl: string;
      lastName: string;
      roleId: number;
      updatedAt: string;
    };
  }

  interface UsersTokenInfo {
    amount: number;
    currentAmount: number;
    user: {
      createdAt: string;
      email: string;
      firstName: string;
      id: string;
      imageUrl: string;
      lastName: string;
      roleId: number;
      updatedAt: string;
    };
  }

  interface DashboardData {
    totalUsers: ReactNode;
    totalConversations: ReactNode;
    totalGroups: ReactNode;
    totalActiveTokens: ReactNode;
    totalUsedTokens: ReactNode;
    totalPosts: ReactNode;
    groupsWithMostUsedTokens: GroupInfo[];
    userWithMostTokens: UsersInfo[];
    usersWithMostUsedTokens: UsersTokenInfo[];
  }

  const teamUsageData: ChartData<'bar', number[], string> = dashboardData && Array.isArray(dashboardData.groupsWithMostUsedTokens) && dashboardData.groupsWithMostUsedTokens.length > 0 ? {
    labels: dashboardData.groupsWithMostUsedTokens.map((group) => group.group.name),
    datasets: [
      {
        label: 'Token Usage per Team',
        data: dashboardData.groupsWithMostUsedTokens.map((group) => group.totalTokens),
        backgroundColor: [
          '#6622CC',
          '#FF47DA',
          '#23C9FF',
          '#F1C40F',
          '#FF6542',
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
  } : {
    labels: [],
    datasets: [{
      label: 'Token Usage per Team',
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    }],
  };

  const userTokenTop: ChartData<'pie', number[], string> = dashboardData && Array.isArray(dashboardData.userWithMostTokens) && dashboardData.userWithMostTokens.length > 0 ? {
    labels: dashboardData.userWithMostTokens.map((user) => user.user.firstName),
    datasets: [
      {
        label: 'Users with Most Tokens',
        data: dashboardData.userWithMostTokens.map((user) => user.amount),
        backgroundColor: [
          '#6622CC',
          '#FF47DA',
          '#23C9FF',
          '#F1C40F',
          '#FF6542',
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
  } : {
    labels: [],
    datasets: [{
      label: 'Users with Most Tokens',
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    }],
  };

  const userTokenUsage: ChartData<'pie', number[], string> = dashboardData && Array.isArray(dashboardData.usersWithMostUsedTokens) && dashboardData.usersWithMostUsedTokens.length > 0 ? {
    labels: dashboardData.usersWithMostUsedTokens.map((user) => user.user.firstName),
    datasets: [
      {
        label: 'Users Token Usage',
        data: dashboardData.usersWithMostUsedTokens.map((user) => user.amount),
        backgroundColor: [
          '#6622CC',
          '#FF47DA',
          '#23C9FF',
          '#F1C40F',
          '#FF6542',
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
  } : {
    labels: [],
    datasets: [{
      label: 'Users Token Usage',
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    }],
  };

  // THIS IS TO EDIT CHART DESIGN
  const lineChartOptions = {
    animation: {
      animateScale: true,
      duration: 5000,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        // position: 'left' as const,
      },
    },
    animation: {
      animationRotate: true,
      animateScale: true,
      duration: 3000,
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
      <Box marginLeft="50px">
        <WTitle1 text="Dashboard." redText="" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          {/* GENERAL INFO CARDS */}
          <Grid container padding="0rem 0 0 3rem" gap={4}>
            <Grid item xs={12} container gap={4}>
              <Grid item xs={3.5}>
                <Card style={{ backgroundColor: 'black', borderRadius: '20px' }}>
                  <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      backgroundColor: '#fff',
                      padding: '15px',
                      borderRadius: '10px',
                      marginRight: '20px',
                    }}
                    >
                      <PersonIcon style={{ color: '#000', fontSize: '5vh' }} />
                    </div>
                    <div>
                      <Typography variant="h3" style={{ color: 'white' }}>{dashboardData.totalUsers}</Typography>
                      <Typography variant="subtitle1" style={{ color: 'white' }}>Wizeliners</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3.5}>
                <Card style={{ backgroundColor: 'black', borderRadius: '20px' }}>
                  <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      backgroundColor: '#fff',
                      padding: '15px',
                      borderRadius: '10px',
                      marginRight: '20px',
                    }}
                    >
                      <ChatIcon style={{ color: '#000', fontSize: '5vh' }} />
                    </div>
                    <div>
                      <Typography variant="h3" style={{ color: 'white' }}>{dashboardData.totalConversations}</Typography>
                      <Typography variant="subtitle1" style={{ color: 'white' }}>Conversations</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3.5}>
                <Card style={{ backgroundColor: 'black', borderRadius: '20px' }}>
                  <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      backgroundColor: '#fff',
                      padding: '15px',
                      borderRadius: '10px',
                      marginRight: '20px',
                    }}
                    >
                      <GroupsIcon style={{ color: '#000', fontSize: '5vh' }} />
                    </div>
                    <div>
                      <Typography variant="h3" style={{ color: 'white' }}>{dashboardData.totalGroups}</Typography>
                      <Typography variant="subtitle1" style={{ color: 'white' }}>Groups</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12} container gap={4}>
              <Grid item xs={3.5}>
                <Card style={{ backgroundColor: 'black', borderRadius: '20px' }}>
                  <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      backgroundColor: '#fff',
                      padding: '15px',
                      borderRadius: '10px',
                      marginRight: '20px',
                    }}
                    >
                      <TokenIcon style={{ color: '#000', fontSize: '5vh' }} />
                    </div>
                    <div>
                      <Typography variant="h3" style={{ color: 'white' }}>{dashboardData.totalActiveTokens}</Typography>
                      <Typography variant="subtitle1" style={{ color: 'white' }}>Active Tokens</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3.5}>
                <Card style={{ backgroundColor: 'black', borderRadius: '20px' }}>
                  <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      backgroundColor: '#fff',
                      padding: '15px',
                      borderRadius: '10px',
                      marginRight: '20px',
                    }}
                    >
                      <ArrowDropDownCircleIcon style={{ color: '#000', fontSize: '5vh' }} />
                    </div>
                    <div>
                      <Typography variant="h3" style={{ color: 'white' }}>{dashboardData.totalUsedTokens}</Typography>
                      <Typography variant="subtitle1" style={{ color: 'white' }}>Tokens Used</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3.5}>
                <Card style={{ backgroundColor: 'black', borderRadius: '20px' }}>
                  <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      backgroundColor: '#fff',
                      padding: '15px',
                      borderRadius: '10px',
                      marginRight: '20px',
                    }}
                    >
                      <SendIcon style={{ color: '#000', fontSize: '5vh' }} />
                    </div>
                    <div>
                      <Typography variant="h3" style={{ color: 'white' }}>{dashboardData.totalPosts}</Typography>
                      <Typography variant="subtitle1" style={{ color: 'white' }}>Post Requests</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          {/* USER WITH MOST TOKENS AND USER WITH MOST TOKENS USED */}
          <Grid container padding="4rem 3rem 3rem 3rem" gap={0}>
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
                  <Typography variant="h5">Top User With Most Tokens</Typography>
                  <Pie data={userTokenTop} options={pieChartOptions} />
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
              }}
              >
                <CardContent>
                  <Typography variant="h5">Top User With Most Token Usage</Typography>
                  <Pie data={userTokenUsage} options={pieChartOptions} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {/* TOKEN USAGE PER TEAM */}
          <Grid padding="0rem 2rem 3rem 2rem" gap={4}>
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
                <Typography variant="h5">Top Groups With Token Usage</Typography>
                <Bar data={teamUsageData} options={pieChartOptions} />
              </CardContent>
            </Card>
          </Grid>
          {/* LINE CHART */}
          <Grid padding="0rem 2rem 3rem 2rem" gap={4}>
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
              <Line data={tokenUsageData} options={lineChartOptions} />
            </Card>
          </Grid>
          {/* ERROR RATE CHART */}
          <Grid padding="0rem 2rem 3rem 2rem" gap={4}>
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
          <Box sx={{ position: 'sticky', top: '100px' }}>
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
