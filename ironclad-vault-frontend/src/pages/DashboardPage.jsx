import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Security,
  Folder,
  CloudUpload,
  History,
  Download,
  Delete,
  Person,
  Storage,
} from '@mui/icons-material';
import fileService from '../services/fileService';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState({
    totalFiles: 0,
    storageUsed: '0 MB',
    recentActivities: 0,
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await fileService.getFiles();
      const filesData = Array.isArray(response.data) ? response.data : response.data?.files || [];
      setFiles(filesData.slice(0, 5)); // Show only 5 recent files
      
      // Calculate stats
      const totalSize = filesData.reduce((sum, file) => sum + (file.fileSize || 0), 0);
      setStats({
        totalFiles: filesData.length,
        storageUsed: `${(totalSize / (1024 * 1024)).toFixed(1)} MB`,
        recentActivities: filesData.length,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleFileDownload = async (fileId, filename) => {
    try {
      await fileService.downloadFile(fileId, filename);
      toast.success('File downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error(error.message || 'Failed to download file');
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return '#ff4081';
      case 'MANAGER': return '#00d4ff';
      default: return '#4caf50';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#fff' }}>
          Welcome back, {user?.username}!
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            icon={<Security />}
            label={user?.role || 'USER'}
            sx={{
              background: getRoleColor(user?.role),
              color: '#fff',
              fontWeight: 600,
            }}
          />
          <Typography sx={{ color: '#a0aec0' }}>
            Last login: {new Date().toLocaleDateString()}
          </Typography>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(19, 47, 76, 0.8))',
            border: '1px solid rgba(0, 212, 255, 0.3)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Folder sx={{ fontSize: 40, color: '#00d4ff', mr: 2 }} />
                <Box>
                  <Typography sx={{ color: '#a0aec0', fontSize: '0.875rem' }}>
                    Total Files
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
                    {stats.totalFiles}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(19, 47, 76, 0.8))',
            border: '1px solid rgba(76, 175, 80, 0.3)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Storage sx={{ fontSize: 40, color: '#4caf50', mr: 2 }} />
                <Box>
                  <Typography sx={{ color: '#a0aec0', fontSize: '0.875rem' }}>
                    Storage Used
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
                    {stats.storageUsed}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(255, 64, 129, 0.1), rgba(19, 47, 76, 0.8))',
            border: '1px solid rgba(255, 64, 129, 0.3)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <History sx={{ fontSize: 40, color: '#ff4081', mr: 2 }} />
                <Box>
                  <Typography sx={{ color: '#a0aec0', fontSize: '0.875rem' }}>
                    Recent Activities
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
                    {stats.recentActivities}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(19, 47, 76, 0.8))',
            border: '1px solid rgba(255, 152, 0, 0.3)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Security sx={{ fontSize: 40, color: '#ff9800', mr: 2 }} />
                <Box>
                  <Typography sx={{ color: '#a0aec0', fontSize: '0.875rem' }}>
                    Security Level
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
                    A+
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            background: 'rgba(19, 47, 76, 0.7)',
            border: '1px solid rgba(0, 212, 255, 0.2)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                  Recent Files
                </Typography>
                <Button
                  size="small"
                  onClick={() => navigate('/files')}
                  sx={{ color: '#00d4ff' }}
                >
                  View All
                </Button>
              </Box>

              {loading ? (
                <LinearProgress sx={{ mb: 2 }} />
              ) : files.length === 0 ? (
                <Typography sx={{ color: '#a0aec0', textAlign: 'center', py: 4 }}>
                  No files uploaded yet
                </Typography>
              ) : (
                files.map((file, index) => (
                  <Box
                    key={file.id || index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      mb: 1,
                      borderRadius: 1,
                      background: index % 2 === 0 ? 'rgba(0, 212, 255, 0.05)' : 'transparent',
                      '&:hover': {
                        background: 'rgba(0, 212, 255, 0.1)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Folder sx={{ color: '#00d4ff' }} />
                      <Box>
                        <Typography sx={{ color: '#fff', fontWeight: 500 }}>
                          {file.filename || 'Unnamed File'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#a0aec0' }}>
                          Uploaded {file.createdAt ? new Date(file.createdAt).toLocaleDateString() : 'Unknown date'}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Tooltip title="Download">
                        <IconButton
                          size="small"
                          onClick={() => handleFileDownload(file.id, file.filename)}
                          sx={{ color: '#00d4ff' }}
                        >
                          <Download />
                        </IconButton>
                      </Tooltip>
                      {isAdmin() && (
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            sx={{ color: '#ff4081', ml: 1 }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ 
            background: 'rgba(19, 47, 76, 0.7)',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            height: '100%',
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, color: '#fff', fontWeight: 600 }}>
                Quick Actions
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<CloudUpload />}
                  onClick={() => navigate('/files')}
                  sx={{
                    background: 'linear-gradient(45deg, #00d4ff, #5affff)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00a3cc, #00d4ff)',
                    },
                  }}
                >
                  Upload Files
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Folder />}
                  onClick={() => navigate('/files')}
                  sx={{
                    borderColor: '#00d4ff',
                    color: '#00d4ff',
                    '&:hover': {
                      borderColor: '#5affff',
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    },
                  }}
                >
                  Manage Files
                </Button>

                {isAdmin() && (
                  <Button
                    variant="outlined"
                    startIcon={<History />}
                    onClick={() => navigate('/audit-logs')}
                    sx={{
                      borderColor: '#ff4081',
                      color: '#ff4081',
                      '&:hover': {
                        borderColor: '#ff79b0',
                        backgroundColor: 'rgba(255, 64, 129, 0.1)',
                      },
                    }}
                  >
                    View Audit Logs
                  </Button>
                )}

                <Button
                  variant="outlined"
                  startIcon={<Security />}
                  sx={{
                    borderColor: '#4caf50',
                    color: '#4caf50',
                    '&:hover': {
                      borderColor: '#81c784',
                      backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    },
                  }}
                >
                  Security Settings
                </Button>
              </Box>

              {/* Storage Usage */}
              <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(0, 212, 255, 0.2)' }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: '#a0aec0' }}>
                  Storage Usage
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={parseFloat(stats.storageUsed) || 0}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #00d4ff, #5affff)',
                    },
                  }}
                />
                <Typography variant="caption" sx={{ mt: 1, color: '#a0aec0', display: 'block' }}>
                  {stats.storageUsed} of 10 GB used
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;