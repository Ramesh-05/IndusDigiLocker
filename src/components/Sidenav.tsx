import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip, Box } from '@mui/material';
import {
  Home, AccountBalance, Business, Calculate, Receipt, Description, Checklist,
  MedicalServices, Work, Groups, Person, SyncAlt, ExitToApp, Menu, ChevronLeft
} from '@mui/icons-material';
import Icon from "../assets/icon.png";
import ConfirmDialog from './ConfirmDialog';

interface SidenavProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidenav: React.FC<SidenavProps> = ({ collapsed, setCollapsed }) => {
 
  const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };
  const changeCompany=()=>{
    localStorage.removeItem("companyid");
    navigate('/companylist');
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 80 : 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 80 : 250,
          backgroundColor: '#375E97',
          color: '#fff',
          transition: 'width 0.3s ease-in-out',
          overflow: 'hidden',
          maxHeight: '100vh',
        },
      }}
    >
      {/* Sidebar Header */}
      <Box sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'space-between', alignItems: 'center', padding: '16px' }}>
        {!collapsed &&<> <img src={ Icon } alt="icon" style={{ height: '60px' }} /> <ListItemText primary="Indus DigiLocker" sx={{ fontSize: '20px',  fontWeight: 'bold' }} /></>}
        <IconButton onClick={toggleSidebar} sx={{ color: 'white' }}>
          {collapsed ? <Menu /> : <ChevronLeft />}
        </IconButton>
      </Box>

      {/* Navigation List */}
      <Box sx={{
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 80px)',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none', 
        },
      }}>
      <List>
        {menuItems.map((item) => (
          <Tooltip title={collapsed ? item.label : ''} placement="right" key={item.label}>
          {item.label==="ChangeCompany"?(
            <ListItem component={"div"} onClick={changeCompany} sx={navItemStyle}>
              <ListItemIcon sx={{ color: '#FFBB00' }}>{item.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={"Change Company"} />}
            </ListItem>
          ):(
            <ListItem component={Link} to={item.to} sx={navItemStyle}>
              <ListItemIcon sx={{ color: '#FFBB00' }}>{item.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={item.label} />}
            </ListItem>
          )}
            
          </Tooltip>
        ))}
      </List>
      </Box>

      {/* Logout */}
      <Box sx={{ position: 'relative', bottom: 20, width: '100%' }}>
        <Tooltip title={collapsed ? "Sign Out" : ""} placement="right">
          <ListItem onClick={()=>setIsDialogOpen(true)} sx={navItemStyle}>
            <ListItemIcon sx={{ color: '#C5001A' }}>
              <ExitToApp />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Sign Out" />}
          </ListItem>
        </Tooltip>
        
      </Box>
      <br></br>
      <ConfirmDialog
            open={isDialogOpen}
            title="Sign Out"
            message="Are you sure you want to Sign Out? This action cannot be undone."
            onClose={() => setIsDialogOpen(false)}
            onConfirm={logout}
          /> 
    </Drawer>
    
  );
};

// Navigation Menu Items
const menuItems = [
  { to: '/home', icon: <Home />, label: 'Home' },
  { to: '/bankotp', icon: <AccountBalance />, label: 'Banks' },
  { to: '/mcalist', icon: <Business />, label: 'MCA' },
  { to: '/incometaxlist', icon: <Calculate />, label: 'Income Tax' },
  { to: '/tdslist', icon: <Receipt />, label: 'TDS' },
  { to: '/gstlist', icon: <Description />, label: 'GST' },
  { to: '/epflist', icon: <Checklist />, label: 'EPF' },
  { to: '/esilist', icon: <MedicalServices />, label: 'ESI' },
  { to: '/ptlist', icon: <Work />, label: 'Professional Tax' },
  { to: '/directorlist', icon: <Groups />, label: 'Directors' },
  { to: '/kmplist', icon: <Person />, label: 'KMP' },
  { to: '/orglist', icon: <Business />, label: 'Corporate' },
  { to: '/companylist', icon: <SyncAlt />, label: 'ChangeCompany' },
];

// Styling for nav items
const navItemStyle = {
  color: '#FFBB00',
  padding: '12px 16px',
  '&:hover': {
    backgroundColor: '#FB6542',
    color: '#ffffff',
  },
};

export default Sidenav;
