import * as React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import Groups3Icon from '@mui/icons-material/Groups3';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import CategoryIcon from '@mui/icons-material/Category';
import FlagIcon from '@mui/icons-material/Flag';
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
import Graffiti_logo from "../img/graffiti_tri2.png";
import default_panda from "../img/default_panda.png";
import AdminDp from "../img/AdminDp.png";
import UsersData from './UsersData';
import DesignersData from './DesignersData';
import "./AdminStyle/light_dark_mode.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminStyle/Admin_Navbar.css";

const drawerWidth = 240;
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [anchorElMode, setAnchorElMode] = React.useState(null);
  const location = useLocation();
  const Navigate = useNavigate();
  const { toggleMode, mode } = React.useContext(ColorModeContext)
  const open = Boolean(anchorElMode);

  const handleItemModeClick = (selectedMode) => {
    toggleMode(selectedMode);
  };
  const IdentifyMode = () => {
    const AdminMode = localStorage.getItem('AdminMode');
    if (AdminMode === 'light') {
      return 'light'
    } else if (AdminMode === 'dark') {
      return 'dark'
    } else if (AdminMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  }
  useEffect(() => {
    const AdminMode = localStorage.getItem('AdminMode');
    //based on system preference

    if (AdminMode === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)")) {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
      }
      else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
      }
    }
    else if (AdminMode === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }

  }, [mode]);

  const handleClickMode = (event) => {
    setAnchorElMode(event.currentTarget);
  };
  const handleCloseMode = () => {
    setAnchorElMode(null);
  };

  const handleListItemClick = (index, text) => {
    setSelectedIndex(index);
    switch (index) {
      case 0:
        Navigate('/Admin/Dashboard')
        break;
      case 1:
        Navigate('/Admin/UsersData')
        break;
      case 2:
        Navigate('/Admin/DesignersData')
        break;
      case 3:
        Navigate('/Admin/UploadersData')
        break;
      case 4:
        Navigate('/Admin/Designs')
        break;
      case 5:
        Navigate('/Admin/ReportedData')
        break;
      default:
        break;
    }
  };
  React.useEffect(() => {
    const pathToIndex = {
      '/Admin/Dashboard': 0,
      '/Admin/UsersData': 1,
      '/Admin/DesignersData': 2,
      '/Admin/UploadersData': 3,
      '/Admin/Designs': 4,
      '/Admin/ReportedData': 5,
      // Add more paths and indices as needed
    };
    setSelectedIndex(pathToIndex[location.pathname] || 0);
  }, [location.pathname]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar disableGutters>
        {/* <MailIcon sx={{ display: { md: 'flex' }, mr: 1, ml: 2 }} /> */}
        <div className="logo_cont">
          <img src={Graffiti_logo} alt="" />
        </div>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            // display: { xs: 'none', md: 'flex' },
            display: { md: 'flex' },
            fontFamily: '"Dancing Script", cursive',
            fontWeight: "bolder",
            fontSize: "3rem",
            // letterSpacing: '.3rem',
            textDecoration: 'none',
            color: 'primary.main'
          }}
        >
          Graffiti
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {['Dashboard', 'Users', 'Designers', 'Uploaders'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              selected={selectedIndex === index} // Set selected prop based on selectedIndex
              onClick={() => handleListItemClick(index, text)}>
              <ListItemIcon>
                {index === 0 && <DashboardIcon />}
                {index === 1 && <ContactPageIcon />}
                {index === 2 &&
                  <Groups3Icon />}
                {index === 3 &&
                  <FaceRetouchingNaturalIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Designs', 'Reported'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              selected={selectedIndex === index + 4} // Set selected prop based on selectedIndex
              onClick={() => handleListItemClick(index + 4, text)}>
              <ListItemIcon>
                {index === 0 && <CategoryIcon />}
                {index === 1 && <FlagIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  useEffect(() => {
    const adminloginsuccess = localStorage.getItem("adminloginsuccess");
    if (adminloginsuccess) {
      toast.success(adminloginsuccess, { className: 'toast-message' });
      localStorage.removeItem("adminloginsuccess");
    }
  }, []);

  const handleLogout = async () => {
    setTimeout(() => {
      localStorage.removeItem('AdminSessionToken');
    }, 2000);
    setTimeout(() => {
      Navigate('/Login');
    }, 2200);
    const myPromise = new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );
    toast.promise(myPromise, {
      pending: "Logging out...",
      success: "Logout Successful",
      error: "Error"
    }, { className: 'toast-message' } );
    const AdminSessionToken = localStorage.getItem('AdminSessionToken');
    const response = await fetch("/adminLogout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AdminSessionToken,
      },
    });
    
  };

  const AdminSessionToken = localStorage.getItem('AdminSessionToken')
  if (!AdminSessionToken) {
    Navigate('/Login')
  }

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        color='warning'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#eda102"
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color='text.primary.dark'>
            Admin
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              size="small"
              aria-label="show 17 new notifications"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleClickMode}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              sx={{
                ml: 1,
                '& svg': {
                  transition: '0.2s',
                  transform: 'translateX(0) rotate(0)',
                },
                '&:hover': {
                  bgcolor: 'unset',
                  '& svg:first-of-type': {
                    transform: 'translateX(-5px) rotate(-20deg)',
                  },
                  '& svg:last-of-type': {
                    right: -7,
                    opacity: 1,
                  },
                },
              }}
            >{IdentifyMode() === 'dark' ?
              <DarkModeIcon /> : <LightModeIcon />
              }
              <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
            </IconButton>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
              <Avatar alt="Admin" src={default_panda} sx={{ width: 32, height: 32 }} />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorElMode}
              open={open}
              onClose={handleCloseMode}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem color='primary' onClick={() => handleItemModeClick('light')} selected={mode === 'light'}>Light</MenuItem>
              <MenuItem onClick={() => handleItemModeClick('dark')} selected={mode === 'dark'}>Dark</MenuItem>
              <MenuItem onClick={() => handleItemModeClick('system')} selected={mode === 'system'}>System</MenuItem>
            </Menu>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={IdentifyMode()}
      />
    </>
  );
}

export default ResponsiveDrawer;
