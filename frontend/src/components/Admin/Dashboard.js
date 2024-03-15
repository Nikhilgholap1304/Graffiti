import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Emoji from 'react-emojis';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import ArrowRight from '@mui/icons-material/ArrowRight';
import Tooltip from '@mui/material/Tooltip';
import { ColorModeContext } from '../../Contexts/ColorModeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Graffiti_logo from "../img/graffiti_tri2.png";
import default_panda from "../img/default_panda.png";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Chart } from 'primereact/chart';
import AdminNavbar from "./AdminNavbar";
import "./AdminStyle/UsersData.css"
import "./AdminStyle/Dashboard.css"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const drawerWidth = 240;

const Dashboard = () => {
  const Navigate = useNavigate();
  const [chartData, setChartData] = useState({});
  const [doughNutchartData, setDoughNutChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [doughNutchartOptions, setDoughNutChartOptions] = useState({});
  const [totalCount, setTotalCount] = useState({});
  // const [usersData, setUsersData] = useState({});

  useEffect(() => {
    const dashboardData = async () => {
      try {
        const res = await axios.get('/get_dashboard_data');
        if (res.status === 200) {
          setTotalCount(res.data.totalCount);
          const usersData = await res.data.users;
          barChart(usersData);
          doughNutChart(await res.data.totalDesignFactors)
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    dashboardData();
  }, []);

  const barChart = async (usersData) => {
    const monthlySignups = {};
    usersData.forEach(user => {
      const signupMonth = new Date(user.createdAt).getMonth() + 1; // Get month (0-indexed, hence the +1)
      if (!monthlySignups[signupMonth]) {
        monthlySignups[signupMonth] = 1; // Initialize count for the month
      } else {
        monthlySignups[signupMonth]++; // Increment count for the month
      }
    });

    // Prepare data for the bar chart
    const labels = Object.keys(monthlySignups).map(month => `Month ${month}`);
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'User Sign-ups',
          data: Object.values(monthlySignups),
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }
      ]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          precision: 0, // Set precision to 0 to display only integers
          ticks: {
            stepSize: 1, // Ensure ticks are in steps of 1
          }
        }
      }
    };
    setChartData(data);
    setChartOptions(options);
  }

  const doughNutChart = async (designData) => {

    // Prepare data for the doughnut chart
    const data = {
      labels: ['Likes', 'Bookmarks', 'Views', 'Reports'],
      datasets: [
        {
          labels: ['Likes', 'Bookmarks', 'Views', 'Reports'],
          data: [designData.totalLikes, designData.totalBookmarks, designData.totalViews, designData.totalReports],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }
      ]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          precision: 0, // Set precision to 0 to display only integers
          ticks: {
            stepSize: 1, // Ensure ticks are in steps of 1
          }
        }
      },
      cutout: '60%',
      plugins: {
        legend: {
            labels: {
                usePointStyle: true
            }
        }
    }
    };
    setDoughNutChartData(data);
    setDoughNutChartOptions(options);
  }



  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AdminNavbar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          {/* <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="text.primary"
              aria-current="page"
              onClick={() => Navigate("/Admin/Dashboard")}
            >
              Dashboard
            </Link>
            <Link
              underline="hover"
              color="inherit"
              onClick={() => Navigate("/Admin/UsersData")}
            >
              Users
            </Link>
          </Breadcrumbs> */}
          <Typography variant='h5' sx={{ mb: 2 }}>
            Dashboard
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {/* <Item><Chart type="bar" data={chartData} options={chartOptions} /></Item> */}
              {/* <Item> */}
              <Card variant="outlined">
                <CardContent sx={{ display: 'flex' }}>
                  <Stack direction="column" spacing={2} flex={1} alignItems='center'>
                    <Typography variant="h6" color='text.secondary'>
                      Total Users
                    </Typography>
                    <Avatar variant="rounded" sx={{ bgcolor: 'primary1.main' }}>
                      <Emoji emoji="boy" />
                    </Avatar>
                  </Stack>
                  <Stack justifyContent="center" flex={1} alignItems='center'>
                    <Typography variant="h4" color='text.secondary'>
                      {totalCount.userCount}
                    </Typography>
                  </Stack>
                </CardContent>
                {/* <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions> */}
              </Card>
              {/* </Item> */}
            </Grid>
            <Grid item xs={4}>
              {/* <Item><Chart type="bar" data={chartData} options={chartOptions} /></Item> */}
              <Card variant="outlined">
                <CardContent sx={{ display: 'flex' }}>
                  <Stack direction="column" spacing={2} flex={1} alignItems='center'>
                    <Typography variant="h6" color='text.secondary'>
                      Total Designers
                    </Typography>
                    <Avatar variant="rounded" sx={{ bgcolor: 'primary1.main' }}>
                      <Emoji emoji="man-artist" />
                    </Avatar>
                  </Stack>
                  <Stack justifyContent="center" flex={1} alignItems='center'>
                    <Typography variant="h4" color='text.secondary'>
                      {totalCount.designerCount}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              {/* <Item><Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-32rem" /></Item> */}
              <Card variant="outlined">
                <CardContent sx={{ display: 'flex' }}>
                  <Stack direction="column" spacing={2} flex={1} alignItems='center'>
                    <Typography variant="h6" color='text.secondary'>
                      Total Designs
                    </Typography>
                    <Avatar variant="rounded" sx={{ bgcolor: 'primary1.main' }}>
                      <Emoji emoji="artist-palette" />
                    </Avatar>
                  </Stack>
                  <Stack justifyContent="center" flex={1} alignItems='center'>
                    <Typography variant="h4" color='text.secondary'>
                      {totalCount.designCount}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant="outlined" sx={{ paddingBottom: '2.7rem' }}>
                <CardHeader title={<Typography variant="h6" color='text.secondary'>Design Vitalities</Typography>} />
                <CardContent sx={{ maxHeight: "33rem" }}>
                  <Chart type="doughnut" data={doughNutchartData} options={doughNutchartOptions} className='doughnutChart'/>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Card variant="outlined">
                <CardHeader title={<Typography variant="h6" color='text.secondary'>SignUp Behaviour</Typography>} />
                <CardContent sx={{ maxHeight: "36rem" }}>
                  <Chart type="bar" data={chartData} options={chartOptions}
                  className='barChart'/>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box >
    </>
  )
}

export default Dashboard