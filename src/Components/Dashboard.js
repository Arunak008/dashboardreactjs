import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './Dashboard.css';


const drawerWidth = 240;
const additionalMargin = 50; // Adjust this value as needed

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth + additionalMargin,
    width: `calc(100% - ${drawerWidth + additionalMargin}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// ... (previous code)

export default function AppBarComponent() {
    const [open, setOpen] = React.useState(false);
    const [openDashboard, setOpenDashboard] = React.useState(false);
    const [openPromotion, setOpenPromotion] = React.useState(false);
  
    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    const handleClickDashboard = () => {
      setOpenDashboard(!openDashboard);
    };
  
    const handleClickPromotion = (option) => {
      console.log(`You clicked on ${option} under Promotion`);
      setOpenPromotion(!openPromotion);
    };
  
    return (
      <div>
        <AppBar position="absolute" open={open}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '46px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Tabs aria-label="basic tabs example">
              <Tab label="Dashboard" onClick={handleClickDashboard} />
              <Tab label="Two" />
              <Tab label="Event Configuration" onClick={() => handleClickPromotion("Event Configuration")} />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
        >
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Winstar BackOffice
              </ListSubheader>
            }
          >
            <ListItem button onClick={handleClickDashboard}>
              <ListItemText primary="Dashboard" />
              {openDashboard ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openDashboard} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {['User Task', 'User Event', 'Spin the wheel', 'Mystery Box'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <ListItem button onClick={() => handleClickPromotion("Promotion")}>
              <ListItemText primary="Promotion" />
              {openPromotion ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openPromotion} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {['Promo Dashboard', 'Buckets', 'Challenges', 'Campaign'].map((text, index) => (
                  <ListItem button key={text} onClick={() => handleClickPromotion(text)}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            {['Redemption', 'Reward', 'Global settings', 'Administrator'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
  