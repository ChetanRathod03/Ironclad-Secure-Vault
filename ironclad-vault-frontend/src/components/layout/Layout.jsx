// src/components/layout/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Drawer, AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Folder,
  History,
  Security,
  Logout,
} from '@mui/icons-material';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = {
  xs: 240,
  sm: 280,
};

const Layout = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth.sm}px)` },
          ml: { sm: `${drawerWidth.sm}px` },
          background: 'rgba(10, 25, 41, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: '#00d4ff' }}>
            Iron-Clad Vault
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'rgba(0, 212, 255, 0.1)' }}>
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography sx={{ color: '#fff' }}>
              {user?.username}
            </Typography>
            <IconButton onClick={logout} sx={{ color: '#ff4081' }}>
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { xs: drawerWidth.xs, sm: drawerWidth.sm }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'linear-gradient(180deg, #0a1929 0%, #132f4c 100%)',
              borderRight: '1px solid rgba(0, 212, 255, 0.2)',
            },
          }}
        >
          <Sidebar onClose={handleDrawerToggle} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth.sm,
              background: 'linear-gradient(180deg, #0a1929 0%, #132f4c 100%)',
              borderRight: '1px solid rgba(0, 212, 255, 0.2)',
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth.sm}px)` },
          background: 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;