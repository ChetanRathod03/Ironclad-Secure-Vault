import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  Folder,
  History,
  Security,
  Logout,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAdmin } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: '#00d4ff', fontWeight: 600 }}>
          Iron-Clad Vault
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(0, 212, 255, 0.2)' }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation('/dashboard')}
            sx={{
              bgcolor: isActive('/dashboard') ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(0, 212, 255, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#00d4ff' }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: '#fff' }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation('/files')}
            sx={{
              bgcolor: isActive('/files') ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(0, 212, 255, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#00d4ff' }}>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="File Manager" sx={{ color: '#fff' }} />
          </ListItemButton>
        </ListItem>

        {isAdmin() && (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('/audit-logs')}
              sx={{
                bgcolor: isActive('/audit-logs') ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(0, 212, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#00d4ff' }}>
                <History />
              </ListItemIcon>
              <ListItemText primary="Audit Logs" sx={{ color: '#fff' }} />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation('/security')}
            sx={{
              bgcolor: isActive('/security') ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(0, 212, 255, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#00d4ff' }}>
              <Security />
            </ListItemIcon>
            <ListItemText primary="Security" sx={{ color: '#fff' }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ bgcolor: 'rgba(0, 212, 255, 0.2)' }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              '&:hover': {
                bgcolor: 'rgba(255, 64, 129, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#ff4081' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: '#fff' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
